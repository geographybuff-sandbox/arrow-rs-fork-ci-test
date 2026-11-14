# Results, 2026-11-10

Bridge versions:
- **Current:** arrow-rs `main` at [`9f45c44c`](https://github.com/apache/arrow-rs/blob/9f45c44c/.github/workflows/fork_ci_status.yml), with the repository name changed.
- **Proposed:** [`apache/infrastructure-actions/fork-ci@36e39161`](https://github.com/apache/infrastructure-actions/tree/36e391618baf31f50c5a7a7347faf00cba6cf085/fork-ci) (`fork-ci/v1.0.0`), configured as in the proposed arrow-rs change.

Upstream: this repository. Fork: [geographybuff/arrow-rs-fork-ci-test](https://github.com/geographybuff/arrow-rs-fork-ci-test).
`ci.yml` is a stand-in for arrow-rs's CI: fork PRs run a lightweight job upstream; fork pushes and manual runs run a simulated suite that marker files make slow or failing.
Each step is a fork push (or a PR change), then one manual bridge sweep, then a read of every `CI (fork)` check on the PR head.
Raw log with every check and run ID: [evidence/log.md](evidence/log.md).

## Differences found

1. **Never-enabled forks get `neutral` instead of `action_required`.** Until a contributor enables Actions on a fork, GitHub returns 404 for its workflows. The current bridge treats 404 as disabled ("Enable CI on your fork", `action_required`). fork-ci treats 404 as "No fork run for this commit" (`neutral`).
   - Sandbox: [PR #1](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/pull/1), check [130073998454](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130073998454) (current) next to [130074608015](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130074608015) (proposed), same commit.
   - arrow-rs on 2026-11-10: 37 of the 150 open fork PRs to `main` that carry a `CI (fork)` check show "Enable CI on your fork". All 37 forks return 404 for `ci.yml`. ([PR list](evidence/arrow_fork_prs.tsv), [checks](evidence/arrow_checks.tsv), [fork states](evidence/ar_state.tsv))
2. **Every sweep rewrites every polled check.** fork-ci skips unchanged results by comparing `details_url`. GitHub stores the check's own page as `details_url` for checks created with `GITHUB_TOKEN` and ignores the fork-run link, so the comparison never matches. Each polled PR costs a PR read and a check update on every sweep. The current bridge doesn't compare `details_url` and writes only on change.
   - Two consecutive sweeps with nothing changed each wrote 4 checks: [42892310046](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892310046), [42892483009](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892483009) (log line `Fork CI: 4 processed, 4 checks written, 0 failed.`).
   - Check [130076563611](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076563611) was created with the fork-run link; the API returns `details_url` = its own `html_url`.
3. **Switching adds a second check to every open fork PR.** fork-ci identifies its checks by `external_id` `fork-ci:ci.yml:pr:N`; the current bridge uses `arrow-rs-fork-ci:N`. fork-ci doesn't adopt the old check, so each PR head shows two `CI (fork)` checks until the next push.
   - [PR #2](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/pull/2): old `success` and new `success` on the same commit.
4. **A check that was active at the switch stays active.** [PR #3](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/pull/3): the old check [130076088406](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076088406) is still `in_progress` after the fork run ended; the new check followed the run to `cancelled`. On arrow-rs on 2026-11-10, none of the 150 checks was active, so this only affects runs in flight at the moment of the switch.
5. **A rerun creates a new check instead of updating the old one.** Documented fork-ci behavior. The PR shows the newest. [PR #4](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/pull/4) step 4d.

## The proposed bridge, step by step (PR #4 unless noted)

| Step | Fork run | `CI (fork)` on the PR head |
|---|---|---|
| 4a first push | [success](https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42886782602) | `success` |
| 4b second push, new head | [success](https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42886928993) | new check on the new head |
| 4c failing suite | [failure](https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887083640) | `failure` |
| 4d first attempt fails, rerun passes | [attempt 1 failure, attempt 2 success](https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887261585) | `failure`, then a new `success` check |
| 4e push run fails, manual run passes | [push failure](https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887635969), [manual success](https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887815833) | `failure`, then a new `success` check |
| 4f docs-only push, skipped by the path filter | none | `neutral` "No fork run for this commit" |
| 4g fork's `ci.yml` disabled | none | `action_required` "Workflows are disabled on the fork" |
| 4h PR retargeted to `release`, new push | [failure](https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42888407218) | no check ([notification run](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42888448970) skipped it) |
| 4h retargeted back to `main` | same run | `failure` |
| PR #5 from a branch in this repository | n/a | no check |
| PR #2 retargeted to `release`, sweep | n/a | not processed ([sweep](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892095045): 3 of 4 open PRs) |

Superseded heads keep their last state (4b's head kept `in_progress`). The current bridge does the same: both only update the current head.

## Fix for difference 2 (apache/infrastructure-actions#1512)

[`actions/fork-ci-fixed`](actions/fork-ci-fixed) is fork-ci v1.0.0 with `details_url` left out of the unchanged-result comparison. Three bridges run it here:
- [`fork_ci_status.yml`](.github/workflows/fork_ci_status.yml): the proposed arrow-rs bridge.
- [`ozone_fork_ci_status.yml`](.github/workflows/ozone_fork_ci_status.yml) and [`ozone_fork_ci_ping.yml`](.github/workflows/ozone_fork_ci_ping.yml): copies of apache/ozone's.
- [`gluten_fork_ci_status.yml`](.github/workflows/gluten_fork_ci_status.yml) and [`gluten_fork_ci_signal.yml`](.github/workflows/gluten_fork_ci_signal.yml): copies of apache/gluten#13535's, with three action calls.

Each row is one manual sweep of every bridge, with log lines `Fork CI: N processed, W checks written` (one per action call). Full log: [evidence/log-fix.md](evidence/log-fix.md).

| Sweep | arrow-rs style | Ozone style | Gluten style (3 calls) |
|---|---|---|---|
| v1.0.0, nothing changed (before the fix) | [4 written](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892310046), [4 written](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892483009) | n/a | n/a |
| Fixed, first sweep: arrow-rs-style checks already exist; the other check names are new | [0 of 4](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899567701) | [4 of 4](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899576985) | [4 of 4 per call](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899587920) |
| Fixed, nothing changed | [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899724058), [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899847199) | [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899734477), [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899856898) | [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899750995), [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899867630) |
| Fixed, PR #6's fork runs changed from success to failure | [1 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900457502) | [1 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900467053) | [1 of 5 per call](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900475830) |
| Fixed, nothing changed after that | [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900577571) | [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900586207) | [0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900594982) |

All five checks on [PR #6](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/pull/6) show `failure`, matching its three fork runs. In the action's own tests, the fake Checks API now stores `details_url` the way GitHub does. With that change, `unchanged observations and repeated notifications do not write` and `unchanged scheduled observations do not re-read the PR` fail on v1.0.0 and pass with the fix. All 67 bridge tests and 21 composite-action tests pass.

## Not explained

- One manual sweep, [42888494484](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42888494484), marked the fork-ci step failed, hung in "Complete job" until the 10-minute timeout cancelled it, and left no log. The same situation (a PR targeting `release`) succeeded on retry ([42892095045](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892095045)), and every other sweep succeeded.

## Not tested

- Scheduled sweeps: GitHub never fired this repository's cron on 2026-11-10, so every sweep here was dispatched manually. Scheduled runs use the same code path.

- arrow-rs's real CI, merge queue and runner groups. The bridge only reads the fork CI's run status, so the stand-in workflow is enough for the bridge's behavior.
- Rate limits at arrow-rs's scale (150+ open fork PRs).
- First-time contributor approval of the upstream PR run.

## Review of apache/infrastructure-actions#1514 (2026-11-12)

kumarUjjawal's [review](https://github.com/apache/infrastructure-actions/pull/1514) made five comments and proposed no code. These probes test comments 1, 3, 4 and 5.

**Real GitHub.** The missing-run checks from steps 4f and 4g (v1.0.0) show what GitHub stores: [neutral](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130081533406) and [action_required](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130082198954) both have `details_url` = their own page, and neither summary links the fork workflow. The API-error payload had not been written before. [`error_path_probe.yml`](.github/workflows/error_path_probe.yml) runs a bridge with the fork API forced to return 503, writing to its own check names:

| Bridge | First failing sweep | Second failing sweep | What [PR #6](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/pull/6) shows |
|---|---|---|---|
| PR #1514 head (c800b9d) | [5 writes](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43222614111) | [0 writes](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43222817558) | [check](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/131197838087): `details_url` = check page, no link to any bridge run |
| Proposed follow-up | [5 writes](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43222653056) | [5 writes](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43222866573) | [check](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/131197981450): summary links the newest bridge run |

**Unit probes.** [`probes/review-1514`](probes/review-1514) runs the action's own harness against three bridges (fork-ci v1.0.0, c800b9d, proposed). The proposed follow-up passes 8 of 8; c800b9d passes 3 and v1.0.0 passes 2. A failing sweep repeated by the same bridge run writes again on v1.0.0 and not on c800b9d or the follow-up. A sweep from a new bridge run writes once on the follow-up, so the check links the newest run. Comment 4's first half does not apply to the current suite: a fake that throws on any update to a check without `html_url` still passes all 67 tests. Comment 5 holds: if the bridge stops sending `details_url`, only 2 tests fail, and both check the request.

**Proposed follow-up.** [`proposed-summary-links.patch`](probes/review-1514/proposed-summary-links.patch) is a local commit on top of c800b9d, not pushed to the PR. It links the fork workflow page and the bridge run in the summaries and checks the stored check in the tests. On c800b9d, 8 of the 68 updated tests fail; with the follow-up, all 68 pass, as do the 21 composite-action tests and prek.

## Hadoop trunk at fork-ci v1.0.1 (2026-11-14)

Before a pin bump in apache/hadoop, this re-ran apache/hadoop's `fork_ci_status.yml` from trunk [8180a87](https://github.com/apache/hadoop/blob/8180a87ce7a84ae495ce342c54b8062edad8a08a/.github/workflows/fork_ci_status.yml) here, twice side by side: as on trunk (fork-ci v1.0.0, `36e3916`) and with only the pin bumped to fork-ci v1.0.1 (`adff9de`, the merge of apache/infrastructure-actions#1514). Both copies, [`hadoop_fork_ci_v100.yml`](.github/workflows/hadoop_fork_ci_v100.yml) and [`hadoop_fork_ci_v101.yml`](.github/workflows/hadoop_fork_ci_v101.yml), differ from trunk only where the sandbox has to: the repository guard, `workflow: ci.yml`, `base-branches: main`, the check name, the concurrency group and the name, and they run on `workflow_dispatch` instead of the 10-minute schedule. Every input fork-ci reads (`sweep-size: "50"`, `sweep-minutes: "10"`, `guide-url`) is unchanged. Five PRs are open here (four from the fork, one from a branch in this repository). Run log: [`evidence/log-hadoop.md`](evidence/log-hadoop.md).

| Sweep | What changed before it | v1.0.0 (trunk) | v1.0.1 (proposed) |
|---|---|---|---|
| 1 | first run, no checks yet | [5 of 5 written](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595214280) | [5 of 5 written](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595218305) |
| 2 | nothing | [5 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595253398) | [0 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595257191) |
| 3 | nothing | [5 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595290011) | [0 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595294110) |
| 4 | new head on PR #4, its [fork run](https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/43595345943) in progress | [5 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595375782) | [1 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595380126) |
| 5 | that fork run finished (fails by design: `ci-fail-push`) | [5 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595446419) | [1 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595450129) |
| 6 | nothing | [5 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595484616) | [0 of 5](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/43595488177) |
| Total | | 30 writes | 7 writes |

Both copies end with the same check on PR #4's new head: `completed/failure`, "Fork run failure" ([v1.0.0](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/132448677265), [v1.0.1](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/132448684645)). v1.0.1 still writes every real change and nothing else.

The proposed apache/hadoop file (trunk with only the pin and its README link bumped) also passes zizmor 1.32.0 with no findings and apache/infrastructure-actions `allowlist-check` v1.0.4 (`apache/` is a trusted owner). At `adff9de`, fork-ci's own suites pass: `node --test fork-ci/bridge.test.cjs` 68 of 68, `pytest fork-ci/test_action.py` 21 of 21.
