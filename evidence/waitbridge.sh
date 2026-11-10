#!/usr/bin/env bash
# waitbridge.sh N: wait until the upstream bridge has N completed runs, then print the newest ones
U=geographybuff-sandbox/arrow-rs-fork-ci-test
for i in $(seq 1 60); do
  c=$(gh run list -R $U --workflow fork_ci_status.yml --limit 100 --json status --jq '[.[]|select(.status=="completed")]|length')
  q=$(gh run list -R $U --limit 50 --json status --jq '[.[]|select(.status!="completed")]|length')
  [ "$c" -ge "$1" ] && [ "$q" = 0 ] && break
  sleep 10
done
gh run list -R $U --workflow fork_ci_status.yml --limit 3 --json databaseId,event,conclusion,createdAt --jq '.[]|[.databaseId,.event,.conclusion,.createdAt]|@tsv'
