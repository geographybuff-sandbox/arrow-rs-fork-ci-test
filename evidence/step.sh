#!/usr/bin/env bash
# step.sh LABEL [expect_run=yes|no]: after a push to the fork, wait for the fork run (if any),
# let upstream go idle, dispatch one bridge sweep, and snapshot the checks.
U=geographybuff-sandbox/arrow-rs-fork-ci-test; F=geographybuff/arrow-rs-fork-ci-test
D=$(dirname "$0"); sha=$(git -C "$D/repo" rev-parse HEAD)
if [ "${2:-yes}" = yes ]; then
  for i in $(seq 1 40); do
    s=$(gh run list -R $F --commit "$sha" --workflow ci.yml --json status,databaseId --jq 'sort_by(.databaseId)|last|.status // ""')
    [ "$s" = completed ] && break; sleep 8
  done
  gh run list -R $F --commit "$sha" --workflow ci.yml --json databaseId,event,conclusion,attempt --jq '.[]|"fork run \(.databaseId) \(.event) attempt \(.attempt): \(.conclusion) https://github.com/'$F'/actions/runs/\(.databaseId)"' | tee -a "$D/evidence/log.md"
else sleep 30; fi
for i in $(seq 1 40); do
  q=$(gh run list -R $U --limit 30 --json status --jq '[.[]|select(.status!="completed")]|length'); [ "$q" = 0 ] && break; sleep 6
done
before=$(gh run list -R $U --workflow fork_ci_status.yml --event workflow_dispatch --limit 1 --json databaseId --jq '.[0].databaseId')
gh workflow run fork_ci_status.yml -R $U >/dev/null
for i in $(seq 1 40); do
  r=$(gh run list -R $U --workflow fork_ci_status.yml --event workflow_dispatch --limit 1 --json databaseId,status --jq '.[0]|"\(.databaseId) \(.status)"')
  [ "${r% *}" != "$before" ] && [ "${r#* }" = completed ] && break; sleep 6
done
echo "bridge sweep: https://github.com/$U/actions/runs/${r% *}" >> "$D/evidence/log.md"
PRS="${PRS:-}" "$D/snap.sh" "$1"
