// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { bridge, configuration } = require(process.env.BRIDGE);
const now = Date.UTC(2026, 9, 26);
const sha = "a".repeat(40);
const config = configuration({ FORK_CI_WORKFLOW: "ci.yml" });
const upstream = { owner: { login: "apache" }, name: "example", full_name: "apache/example" };
const fork = { owner: { login: "contributor" }, name: "example", full_name: "contributor/example" };
const pull = (number = 1, overrides = {}) => ({
  number, state: "open", updated_at: new Date(now).toISOString(),
  base: { ref: "main", repo: upstream }, head: { sha, ref: "feature", repo: fork }, ...overrides,
});
const run = (id = 10, overrides = {}) => ({
  id, status: "completed", conclusion: "success", run_attempt: 1, event: "push",
  head_sha: sha, head_branch: "feature", head_repository: fork, ...overrides,
});
const failure = (status) => Object.assign(new Error("untrusted response text"), { status });
const signal = { workflow_run: { event: "pull_request", head_repository: fork, head_branch: "feature", head_sha: sha, pull_requests: [] } };

function harness(options = {}) {
  const prs = options.prs || [pull()];
  const writes = [], calls = [], errors = [], failures = [];
  const checks = structuredClone(options.checks || []);
  const runs = options.runs || [run()];
  const record = (name, params) => calls.push({ name, params });
  const rest = {
    pulls: {
      list: async (p) => {
        record("pulls.list", p);
        return { data: prs.slice((p.page - 1) * p.per_page, p.page * p.per_page) };
      },
      get: async (p) => {
        record("pulls.get", p);
        return { data: options.current ? options.current(p.pull_number) : prs.find((pr) => pr.number === p.pull_number) };
      },
    },
    checks: {
      listForRef: async (p) => {
        record("checks.listForRef", p);
        const matching = checks.filter((c) => c.head_sha === p.ref);
        return { data: { check_runs: matching.slice((p.page - 1) * p.per_page, p.page * p.per_page) } };
      },
      create: async (p) => {
        record("checks.create", p);
        if (options.writeError?.(p)) throw failure(403);
        writes.push({ method: "create", ...p });
        const id = 1000 + checks.length;
        // Like GitHub for GITHUB_TOKEN writes, keep the check page, not the requested details_url.
        const page = `https://github.com/apache/example/runs/${id}`;
        const check = { ...p, id, app: { slug: "github-actions" }, html_url: page, details_url: page };
        checks.push(check);
        return { data: check };
      },
      update: async (p) => {
        record("checks.update", p);
        if (options.writeError?.(p)) throw failure(403);
        writes.push({ method: "update", ...p });
        const check = checks.find((c) => c.id === p.check_run_id);
        Object.assign(check, p, { details_url: check.html_url });
      },
    },
    actions: {
      listWorkflowRuns: async (p) => {
        record("actions.listWorkflowRuns", p);
        const status = options.readError?.(p);
        if (status) throw failure(status);
        // Follow GitHub's newest-first ordering and event filter. Keep other
        // mismatches to test defensive response validation.
        return { data: { workflow_runs: runs.filter((r) => r.event === p.event).sort((a, b) => b.id - a.id).slice(0, p.per_page) } };
      },
      getWorkflow: async (p) => {
        record("actions.getWorkflow", p);
        if (options.stateError) throw failure(options.stateError);
        return { data: { state: options.state || "active" } };
      },
    },
  };
  const github = {
    rest,
    paginate: async (method, params) => {
      const result = [];
      for (let page = 1; ; page++) {
        const { data } = await method({ ...params, page });
        const items = Array.isArray(data) ? data : data.check_runs;
        result.push(...items);
        if (items.length < params.per_page) return result;
      }
    },
  };
  const context = {
    repo: { owner: "apache", repo: "example" }, runId: options.runId ?? 123,
    eventName: options.event || "workflow_run",
    payload: options.payload || signal,
  };
  const core = { info() {}, error: (s) => errors.push(s), setFailed: (s) => failures.push(s) };
  return {
    writes, calls, checks, errors, failures,
    execute: () => bridge({ github, context, core, config: { ...config, ...options.config }, now: options.now ?? now }),
  };
}

async function existing(runOverrides = {}) {
  const h = harness({ runs: [run(10, runOverrides)] });
  await h.execute();
  return h.checks;
}
