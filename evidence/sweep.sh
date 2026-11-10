#!/usr/bin/env bash
# sweep.sh LABEL: dispatch one sweep of each bridge, wait, and log each run's "Fork CI:" lines.
U=geographybuff-sandbox/arrow-rs-fork-ci-test; L=$(dirname "$0")/evidence/log-fix.md
for i in $(seq 1 40); do q=$(gh run list -R $U --limit 40 --json status --jq '[.[]|select(.status!="completed")]|length'); [ "$q" = 0 ] && break; sleep 6; done
declare -A before
for w in fork_ci_status.yml ozone_fork_ci_status.yml gluten_fork_ci_status.yml; do
  before[$w]=$(gh run list -R $U --workflow $w --event workflow_dispatch --limit 1 --json databaseId --jq '.[0].databaseId // 0')
  gh workflow run $w -R $U >/dev/null
done
{ echo; echo "### $1 ($(date -u +%FT%TZ))"; } >> "$L"
for w in fork_ci_status.yml ozone_fork_ci_status.yml gluten_fork_ci_status.yml; do
  for i in $(seq 1 60); do
    r=$(gh run list -R $U --workflow $w --event workflow_dispatch --limit 1 --json databaseId,status,conclusion --jq '.[0]|"\(.databaseId) \(.status) \(.conclusion)"')
    set -- $r; [ "$1" != "${before[$w]}" ] && [ "$2" = completed ] && break; sleep 5
  done
  lines=$(gh run view $1 -R $U --log 2>/dev/null | cut -f3- | grep -oE 'Fork CI: .*' | tr '\n' ' ')
  echo "- \`$w\` [$1](https://github.com/$U/actions/runs/$1) $3: $lines" | tee -a "$L"
done
