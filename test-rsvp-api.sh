#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash test-rsvp-api.sh https://your-production-domain.com
# Default domain comes from the current project configuration.
BASE_URL="${1:-https://hofang.tech}"
BASE_URL="${BASE_URL%/}"
TEST_EMAIL="ringhost42@gmail.com"
TEST_ID="TEST-API-$(date -u +%Y%m%dT%H%M%SZ)-$RANDOM"
TEST_NAME="[TEST API] RSVP $(date '+%Y-%m-%d %H:%M:%S')"
RESPONSE_FILE="$(mktemp)"
trap 'rm -f "$RESPONSE_FILE"' EXIT

printf 'POST %s/api/rsvp\n' "$BASE_URL"
printf 'Email: %s\n' "$TEST_EMAIL"
printf 'SubmissionId: %s\n\n' "$TEST_ID"

HTTP_STATUS="$(curl -sS \
  --max-time 30 \
  --output "$RESPONSE_FILE" \
  --write-out '%{http_code}' \
  --request POST "$BASE_URL/api/rsvp" \
  --header 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' \
  --data-urlencode "name=$TEST_NAME" \
  --data-urlencode "email=$TEST_EMAIL" \
  --data-urlencode 'guests=2' \
  --data-urlencode 'attendance=attending' \
  --data-urlencode "message=TEST API: RSVP confirmation check ($TEST_ID)" \
  --data-urlencode "submissionId=$TEST_ID")"

BODY="$(cat "$RESPONSE_FILE")"
printf 'HTTP status: %s\n' "$HTTP_STATUS"
printf 'Response: %s\n' "$BODY"

if [[ "$HTTP_STATUS" != 2* ]]; then
  printf '\nFAIL: API returned HTTP %s.\n' "$HTTP_STATUS" >&2
  exit 1
fi

if ! grep -Eq '"result"[[:space:]]*:[[:space:]]*"success"' "$RESPONSE_FILE"; then
  printf '\nFAIL: API did not return result=success.\n' >&2
  exit 1
fi

printf '\nPASS: RSVP API accepted the TEST submission.\n'
printf 'Now verify the Sheet row, ThankYouSentAt, Apps Script Executions, and inbox: %s\n' "$TEST_EMAIL"
printf 'After checking, remove the row whose name starts with [TEST API] or whose SubmissionId is %s.\n' "$TEST_ID"
