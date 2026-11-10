# fork-ci with the details_url fix

`action.yml` and `bridge.cjs` from apache/infrastructure-actions `fork-ci` at
`fork-ci/v1.0.0` (36e391618baf31f50c5a7a7347faf00cba6cf085), plus the proposed fix for
[apache/infrastructure-actions#1512](https://github.com/apache/infrastructure-actions/issues/1512):
the unchanged-result check no longer compares `details_url`. Copied here only so this
sandbox's bridges can run the fix. Licensed under the Apache License 2.0.
