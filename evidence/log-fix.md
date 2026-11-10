# Fix evidence log (fork-ci + #1512 fix)

### Sweep 1 right after switching: arrow-style checks exist from v1.0.0; Ozone/Gluten-style check names are new (2026-11-10T20:53:02Z)
- `fork_ci_status.yml` [42899567701](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899567701) success: Fork CI: 4 processed, 0 checks written, 0 failed. 
- `ozone_fork_ci_status.yml` [42899576985](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899576985) success: Fork CI: 4 processed, 4 checks written, 0 failed. 
- `gluten_fork_ci_status.yml` [42899587920](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899587920) success: Fork CI: 4 processed, 4 checks written, 0 failed. Fork CI: 4 processed, 4 checks written, 0 failed. Fork CI: 4 processed, 4 checks written, 0 failed. 

### Sweep 2, nothing changed (2026-11-10T20:54:04Z)
- `fork_ci_status.yml` [42899724058](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899724058) success: Fork CI: 4 processed, 0 checks written, 0 failed. 
- `ozone_fork_ci_status.yml` [42899734477](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899734477) success: Fork CI: 4 processed, 0 checks written, 0 failed. 
- `gluten_fork_ci_status.yml` [42899750995](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899750995) success: Fork CI: 4 processed, 0 checks written, 0 failed. Fork CI: 4 processed, 0 checks written, 0 failed. Fork CI: 4 processed, 0 checks written, 0 failed. 

### Sweep 3, nothing changed (2026-11-10T20:54:47Z)
- `fork_ci_status.yml` [42899847199](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899847199) success: Fork CI: 4 processed, 0 checks written, 0 failed. 
- `ozone_fork_ci_status.yml` [42899856898](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899856898) success: Fork CI: 4 processed, 0 checks written, 0 failed. 
- `gluten_fork_ci_status.yml` [42899867630](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42899867630) success: Fork CI: 4 processed, 0 checks written, 0 failed. Fork CI: 4 processed, 0 checks written, 0 failed. Fork CI: 4 processed, 0 checks written, 0 failed. 
fork CI kafka: success https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42899982432
fork CI arm: success https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42899982458
fork CI: success https://github.com/geographybuff/arrow-rs-fork-ci-test/actions/runs/42899982619

### PR #6 opened, all three fork runs passed (expect writes for PR #6 only) (2026-11-10T20:56:36Z)
- `fork_ci_status.yml` [42900132926](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900132926) success: Fork CI: 5 processed, 0 checks written, 0 failed. 
- `ozone_fork_ci_status.yml` [42900144096](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900144096) success: Fork CI: 5 processed, 0 checks written, 0 failed. 
- `gluten_fork_ci_status.yml` [42900153708](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900153708) success: Fork CI: 5 processed, 0 checks written, 0 failed. Fork CI: 5 processed, 0 checks written, 0 failed. Fork CI: 5 processed, 0 checks written, 0 failed. 
  Velox Kafka in fork: completed/success Fork run success
  Velox Backend (ARM) in fork: completed/success Fork run success
  Velox Backend (x86) in fork: completed/success Fork run success
  build-branch (fork): completed/success Fork run success
  CI (fork): completed/success Fork run success
Notification runs listed below are from PR #6 opening, not this push (helper read them before the push's runs existed); the push's own check reads came back empty at that moment.
- `fork_ci_status.yml` [42900028497](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900028497): Fork CI: 1 processed, 1 checks written, 0 failed. 
- `ozone_fork_ci_status.yml` [42900028839](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900028839): Fork CI: 1 processed, 1 checks written, 0 failed. 
- `gluten_fork_ci_status.yml` [42900022628](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900022628): Fork CI: 1 processed, 1 checks written, 0 failed. Fork CI: 1 processed, 1 checks written, 0 failed. Fork CI: 1 processed, 1 checks written, 0 failed. 
fork CI arm: failure
fork CI: failure
fork CI kafka: failure

### PR #6 fork runs finished as failures (expect writes for PR #6 only) (2026-11-10T20:58:41Z)
- `fork_ci_status.yml` [42900457502](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900457502) success: Fork CI: 5 processed, 1 checks written, 0 failed. 
- `ozone_fork_ci_status.yml` [42900467053](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900467053) success: Fork CI: 5 processed, 1 checks written, 0 failed. 
- `gluten_fork_ci_status.yml` [42900475830](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900475830) success: Fork CI: 5 processed, 1 checks written, 0 failed. Fork CI: 5 processed, 1 checks written, 0 failed. Fork CI: 5 processed, 1 checks written, 0 failed. 

### Unchanged after the failures (2026-11-10T20:59:27Z)
- `fork_ci_status.yml` [42900577571](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900577571) success: Fork CI: 5 processed, 0 checks written, 0 failed. 
- `ozone_fork_ci_status.yml` [42900586207](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900586207) success: Fork CI: 5 processed, 0 checks written, 0 failed. 
- `gluten_fork_ci_status.yml` [42900594982](https://github.com/geographybuff-sandbox/arrow-rs-fork-ci-test/actions/runs/42900594982) success: Fork CI: 5 processed, 0 checks written, 0 failed. Fork CI: 5 processed, 0 checks written, 0 failed. Fork CI: 5 processed, 0 checks written, 0 failed. 
  CI (fork): completed/failure
  Velox Kafka in fork: completed/failure
  build-branch (fork): completed/failure
  Velox Backend (ARM) in fork: completed/failure
  Velox Backend (x86) in fork: completed/failure
