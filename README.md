# arrow-rs fork CI bridge test

A public sandbox for end-to-end testing of
[apache/arrow-rs#12145](https://github.com/apache/arrow-rs/issues/12145):
replacing arrow-rs's inline `fork_ci_status.yml` bridge with the shared
[`apache/infrastructure-actions/fork-ci`](https://github.com/apache/infrastructure-actions/tree/main/fork-ci) action.

This repository plays apache/arrow-rs. `geographybuff/arrow-rs-fork-ci-test` is the
contributor fork. `ci.yml` stands in for arrow-rs's CI. The bridge workflow starts as
arrow-rs's current version, with only the repository name changed, and is then
replaced by the proposed version. Results are in [RESULTS.md](RESULTS.md).
