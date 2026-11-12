// Probes for the review comments on apache/infrastructure-actions#1514.
// Run with BRIDGE=<path to bridge.cjs>. The fake keeps the check page as
// details_url, as GitHub does for GITHUB_TOKEN writes (sandbox RESULTS.md).

const forkRun = "https://github.com/contributor/example/actions/runs/10";
const workflowPage = "https://github.com/contributor/example/actions/workflows/ci.yml";
const bridgeRun = (id) => `https://github.com/apache/example/actions/runs/${id}`;
// Everything GitHub shows for a stored check: the details link plus the output.
const visible = (c) => [c.details_url, c.output.title, c.output.summary, c.output.text].join("\n");

// Comment 1: does each payload's link survive in what GitHub stores?
test("claim1 found run: stored check carries the fork run link", async () => {
  const h = harness();
  await h.execute();
  assert.ok(visible(h.checks[0]).includes(forkRun));
});
for (const state of ["active", "disabled_fork"]) {
  test(`claim1 missing run (${state}): stored check carries the fork workflow link`, async () => {
    const h = harness({ runs: [], state });
    await h.execute();
    assert.equal(h.writes[0].details_url, workflowPage); // requested
    assert.ok(visible(h.checks[0]).includes(workflowPage)); // stored
  });
}
// Comments 1 and 3: the API-error payload.
test("claim3 API error: stored check carries the bridge run link", async () => {
  const h = harness({ readError: () => 503 });
  await h.execute();
  assert.equal(h.writes[0].details_url, bridgeRun(123)); // requested
  assert.ok(visible(h.checks[0]).includes(bridgeRun(123))); // stored
});
// Comment 4, second half: repeated failures. Report the write count and
// whether the stored check points at the newest failing bridge run.
test("claim3/4 repeated API error: second failing sweep", async () => {
  const first = harness({ readError: () => 503, runId: 123 });
  await first.execute();
  const second = harness({ checks: first.checks, readError: () => 503, runId: 124 });
  await second.execute();
  console.log(`  [${process.env.LABEL}] second failing sweep writes: ${second.writes.length}; ` +
    `stored links to run 123: ${visible(second.checks[0]).includes(bridgeRun(123))}, ` +
    `run 124: ${visible(second.checks[0]).includes(bridgeRun(124))}`);
  assert.ok(visible(second.checks[0]).includes(bridgeRun(124)));
});
test("claim3/4 repeated API error, same bridge run (retry): no write", async () => {
  const first = harness({ readError: () => 503, runId: 123 });
  await first.execute();
  const again = harness({ checks: first.checks, readError: () => 503, runId: 123 });
  await again.execute();
  assert.equal(again.writes.length, 0);
});
// Comment 5: "deleted fork run clears a previous success and its link",
// asserted on the stored check instead of the request.
test("claim5 deleted fork run: stored check no longer shows the old run link", async () => {
  const h = harness({ checks: await existing(), runs: [] });
  await h.execute();
  assert.equal(h.writes[0].method, "update");
  assert.ok(!visible(h.checks[0]).includes(forkRun));
});
test("claim5 deleted fork run: stored check shows the workflow link instead", async () => {
  const h = harness({ checks: await existing(), runs: [] });
  await h.execute();
  assert.ok(visible(h.checks[0]).includes(workflowPage));
});
