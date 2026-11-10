# Evidence log

### Old bridge, PR #1 opened while fork workflows are disabled (2026-11-10T19:30:16Z)
- PR #1 `pr-disabled` → `main` (OPEN) head `f11635c`
  - check 130073998454: completed/action_required ext=`arrow-rs-fork-ci:1` "Enable CI on your fork" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130073998454

### Proposed bridge (temporary), PR #1, fork workflows never enabled (2026-11-10T19:31:31Z)
- PR #1 `pr-disabled` → `main` (OPEN) head `f11635c`
  - check 130073998454: completed/action_required ext=`arrow-rs-fork-ci:1` "Enable CI on your fork" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130073998454
  - check 130074608015: completed/neutral ext=`fork-ci:ci.yml:pr:1` "No fork run for this commit" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130074608015

Sandbox main reverted to arrow-rs's current bridge after the never-enabled test above.

### Old bridge baseline: PR #2 fork run passed, PR #3 fork run in progress (2026-11-10T19:33:53Z)
- PR #3 `pr-slow` → `main` (OPEN) head `6052739`
  - check 130076088406: in_progress/- ext=`arrow-rs-fork-ci:3` "Fork CI: in_progress" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076088406
- PR #2 `pr-pass` → `main` (OPEN) head `fff8d8e`
  - check 130076093847: completed/success ext=`arrow-rs-fork-ci:2` "Fork CI: success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076093847
- PR #1 `pr-disabled` → `main` (OPEN) head `f11635c`
  - check 130073998454: completed/action_required ext=`arrow-rs-fork-ci:1` "Enable CI on your fork" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130073998454
  - check 130074608015: completed/neutral ext=`fork-ci:ci.yml:pr:1` "No fork run for this commit" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130074608015

### Switched to the proposed bridge; one manual sweep (2026-11-10T19:34:49Z)
- PR #3 `pr-slow` → `main` (OPEN) head `6052739`
  - check 130076088406: in_progress/- ext=`arrow-rs-fork-ci:3` "Fork CI: in_progress" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076088406
  - check 130076578319: in_progress/- ext=`fork-ci:ci.yml:pr:3` "Fork run in_progress" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076578319
- PR #2 `pr-pass` → `main` (OPEN) head `fff8d8e`
  - check 130076093847: completed/success ext=`arrow-rs-fork-ci:2` "Fork CI: success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076093847
  - check 130076563611: completed/success ext=`fork-ci:ci.yml:pr:2` "Fork run success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076563611
- PR #1 `pr-disabled` → `main` (OPEN) head `f11635c`
  - check 130073998454: completed/action_required ext=`arrow-rs-fork-ci:1` "Enable CI on your fork" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130073998454
  - check 130074608015: completed/neutral ext=`fork-ci:ci.yml:pr:1` "No fork run for this commit" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130074608015
fork run 42886782602 push attempt 1: success https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42886782602
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42886593636

### 4a: first push, fork run passes (2026-11-10T19:36:05Z)
- PR #4 `pr-flow` → `main` (OPEN) head `b82a7d8`
  - check 130077357390: completed/success ext=`fork-ci:ci.yml:pr:4` "Fork run success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130077357390
fork run 42886928993 push attempt 1: success https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42886928993
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42886893964

### 4b: second push (new head), fork run passes (2026-11-10T19:37:08Z)
- PR #4 `pr-flow` → `main` (OPEN) head `16c8695`
  - check 130077771213: in_progress/- ext=`fork-ci:ci.yml:pr:4` "Fork run in_progress" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130077771213
fork run 42887083640 push attempt 1: failure https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887083640
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42887063666

### 4c: fork run fails (2026-11-10T19:37:38Z)
- PR #4 `pr-flow` → `main` (OPEN) head `c984276`
  - check 130078198572: in_progress/- ext=`fork-ci:ci.yml:pr:4` "Fork run in_progress" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130078198572
(4b/4c snapshots above were taken before their sweep finished: helper bug, fixed. Re-snapshot after sweep https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42887145471)

### 4c (re-snapshot): fork run fails (2026-11-10T19:38:07Z)
- PR #4 `pr-flow` → `main` (OPEN) head `c984276`
  - check 130078198572: completed/failure ext=`fork-ci:ci.yml:pr:4` "Fork run failure" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130078198572
4b head 16c8695: in_progress/null Fork run in_progress
fork run 42887261585 push attempt 1: failure https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887261585
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42887367759

### 4d1: first attempt fails (2026-11-10T19:39:23Z)
- PR #4 `pr-flow` → `main` (OPEN) head `8dff79b`
  - check 130079016278: completed/failure ext=`fork-ci:ci.yml:pr:4` "Fork run failure" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130079016278
fork run 42887261585 push attempt 2: success https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887261585
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42887538254

### 4d2: rerun of the same run passes (attempt 2) (2026-11-10T19:40:26Z)
- PR #4 `pr-flow` → `main` (OPEN) head `8dff79b`
  - check 130079016278: completed/failure ext=`fork-ci:ci.yml:pr:4` "Fork run failure" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130079016278
  - check 130079888536: completed/success ext=`fork-ci:ci.yml:pr:4` "Fork run success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130079888536
fork run 42887635969 push attempt 1: failure https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887635969
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42887744897

### 4e1: push run fails (2026-11-10T19:41:38Z)
- PR #4 `pr-flow` → `main` (OPEN) head `ee6bc21`
  - check 130080329086: completed/failure ext=`fork-ci:ci.yml:pr:4` "Fork run failure" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130080329086
fork run 42887815833 workflow_dispatch attempt 1: success https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887815833
fork run 42887635969 push attempt 1: failure https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42887635969
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42887889889

### 4e2: manual run on the same commit passes and replaces the failed push run (2026-11-10T19:42:30Z)
- PR #4 `pr-flow` → `main` (OPEN) head `ee6bc21`
  - check 130080329086: completed/failure ext=`fork-ci:ci.yml:pr:4` "Fork run failure" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130080329086
  - check 130081117505: completed/success ext=`fork-ci:ci.yml:pr:4` "Fork run success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130081117505
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42888098797

### 4f: docs-only push, no fork run (path filter) (2026-11-10T19:43:46Z)
- PR #4 `pr-flow` → `main` (OPEN) head `09b3603`
  - check 130081533406: completed/neutral ext=`fork-ci:ci.yml:pr:4` "No fork run for this commit" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130081533406
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42888290066

### 4g: fork CI workflow disabled, no run (2026-11-10T19:44:55Z)
- PR #4 `pr-flow` → `main` (OPEN) head `4f49c25`
  - check 130082198954: completed/action_required ext=`fork-ci:ci.yml:pr:4` "Workflows are disabled on the fork" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130082198954
fork run 42888407218 push attempt 1: failure https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42888407218
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42888494484

### 4h1: PR retargeted to release, new fork run passes: expect no CI (fork) check on this head (2026-11-10T19:50:23Z)
- PR #4 `pr-flow` → `release` (OPEN) head `5192eb3`

### 4h1 again, after the failed sweep (2026-11-10T19:55:33Z)
- PR #4 `pr-flow` → `main` (OPEN) head `5192eb3`
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42890208663

### 4h2: PR retargeted back to main: the sweep adds the check (2026-11-10T20:00:42Z)
- PR #4 `pr-flow` → `main` (OPEN) head `5192eb3`

### After the 19:56 sweep (all PRs) (2026-11-10T20:01:36Z)
- PR #4 `pr-flow` → `main` (OPEN) head `5192eb3`
  - check 130091942128: completed/failure ext=`fork-ci:ci.yml:pr:4` "Fork run failure" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130091942128
- PR #3 `pr-slow` → `main` (OPEN) head `6052739`
  - check 130076088406: in_progress/- ext=`arrow-rs-fork-ci:3` "Fork CI: in_progress" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076088406
  - check 130076578319: completed/cancelled ext=`fork-ci:ci.yml:pr:3` "Fork run cancelled" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076578319
- PR #2 `pr-pass` → `main` (OPEN) head `fff8d8e`
  - check 130076093847: completed/success ext=`arrow-rs-fork-ci:2` "Fork CI: success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076093847
  - check 130076563611: completed/success ext=`fork-ci:ci.yml:pr:2` "Fork run success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076563611
- PR #1 `pr-disabled` → `main` (OPEN) head `f11635c`
  - check 130073998454: completed/action_required ext=`arrow-rs-fork-ci:1` "Enable CI on your fork" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130073998454
  - check 130074608015: completed/neutral ext=`fork-ci:ci.yml:pr:1` "No fork run for this commit" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130074608015
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42891302992

### 5: same-repository PR: expect no CI (fork) check (2026-11-10T20:03:14Z)
- PR #5 `same-repo` → `main` (OPEN) head `76c38a7`
Retargeted PR #2 to release to retry the failed 4h1 sweep.
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892095045

### 6: PR #2 retargeted to release, sweep (retry of the failed 4h1 sweep) (2026-11-10T20:07:42Z)
- PR #2 `pr-pass` → `release` (OPEN) head `fff8d8e`
  - check 130076093847: completed/success ext=`arrow-rs-fork-ci:2` "Fork CI: success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076093847
  - check 130076563611: completed/success ext=`fork-ci:ci.yml:pr:2` "Fork run success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076563611
PR #2 retargeted back to main.
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892310046

### 7.1: unchanged sweep 1 (2026-11-10T20:08:58Z)
- PR #2 `pr-pass` → `main` (OPEN) head `fff8d8e`
  - check 130076093847: completed/success ext=`arrow-rs-fork-ci:2` "Fork CI: success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076093847
  - check 130076563611: completed/success ext=`fork-ci:ci.yml:pr:2` "Fork run success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076563611
sweep 42892310046: Fork CI: 4 processed, 4 checks written, 0 failed.
bridge sweep: https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42892483009

### 7.2: unchanged sweep 2 (2026-11-10T20:09:59Z)
- PR #2 `pr-pass` → `main` (OPEN) head `fff8d8e`
  - check 130076093847: completed/success ext=`arrow-rs-fork-ci:2` "Fork CI: success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076093847
  - check 130076563611: completed/success ext=`fork-ci:ci.yml:pr:2` "Fork run success" → https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076563611
sweep 42892483009: Fork CI: 4 processed, 4 checks written, 0 failed.
check 130076563611 details_url=https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076563611 html_url=https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/runs/130076563611 completed_at=2026-11-10T19:34:32Z
