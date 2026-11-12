# Probes for the review of apache/infrastructure-actions#1514

`harness.cjs` is the harness from fork-ci's `bridge.test.cjs` (c800b9d), with `runId` made configurable. Run against any bridge:

```sh
cat harness.cjs claims.test.cjs > run.test.cjs
BRIDGE=/path/to/bridge.cjs node --test run.test.cjs
```

Results: fork-ci v1.0.0 passes 2 of 8, c800b9d 3 of 8, the proposed follow-up 8 of 8.
