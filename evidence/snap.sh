#!/usr/bin/env bash
# snap.sh LABEL: record every "CI (fork)" check on each PR's head (open and closed) to evidence/log.md
set -euo pipefail
U=geographybuff-sandbox/arrow-rs-fork-ci-test
L=$(dirname "$0")/evidence/log.md
{
  echo; echo "### $1 ($(date -u +%FT%TZ))"
  gh pr list -R $U --state all ${PRS:+--search "$PRS"} --json number,headRefName,headRefOid,baseRefName,state --jq '.[]|[.number,.headRefName,.headRefOid,.baseRefName,.state]|@tsv' |
  while IFS=$'\t' read -r n br sha base st; do
    echo "- PR #$n \`$br\` → \`$base\` ($st) head \`${sha:0:7}\`"
    gh api "repos/$U/commits/$sha/check-runs?check_name=CI%20(fork)&filter=all&per_page=100" --jq '.check_runs|sort_by(.id)[]|"  - check \(.id): \(.status)/\(.conclusion // "-") ext=`\(.external_id)` \"\(.output.title)\" → \(.details_url)"'
  done
} | tee -a "$L"
