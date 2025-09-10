#!/bin/bash

# e2e-demo.sh: A script to run an end-to-end test of the Blokaid donation flow.

# Exit on error and on pipe failure
set -eo pipefail

# --- Configuration ---
BASE_URL="http://localhost:3001/api"
MOCK_MODE=false
JWT_TOKEN=""

# --- Colors for logging ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# --- Helper Functions ---

log_step() {
    echo -e "\n${GREEN}➡️  STEP: $1${NC}"
}

log_info() {
    echo "   - $1"
}

log_success() {
    echo -e "   ${GREEN}✅ SUCCESS:${NC} $1"
}

log_warning() {
    echo -e "   ${YELLOW}⚠️  WARN:${NC} $1"
}

log_error() {
    echo -e "   ${RED}❌ ERROR:${NC} $1" >&2
    exit 1
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to make a curl request and check the status
# Usage: http_request METHOD ENDPOINT [DATA_JSON]
http_request() {
    local method="$1"
    local endpoint="$2"
    local data_json="$3"
    local headers=(-s -w "%{http_code}" -H "Content-Type: application/json")

    if [ -n "$JWT_TOKEN" ]; then
        headers+=(-H "Authorization: Bearer $JWT_TOKEN")
    fi

    if [ "$method" == "POST" ]; then
        response=$(curl "${headers[@]}" -X POST -d "$data_json" "$BASE_URL$endpoint")
    else
        response=$(curl "${headers[@]}" -X GET "$BASE_URL$endpoint")
    fi

    http_code="${response: -3}"
    body="${response:0:${#response}-3}"

    if [[ "$http_code" -lt 200 || "$http_code" -ge 300 ]]; then
        log_error "HTTP request to $endpoint failed with status $http_code. Response: $body"
    fi

    echo "$body"
}

# --- Main Script ---

# 0. Pre-flight checks
log_step "Pre-flight Checks"
if ! command_exists jq; then
    log_error "'jq' is not installed. Please install it to parse JSON responses (e.g., 'sudo apt-get install jq' or 'brew install jq')."
fi
log_success "All dependencies are installed."

# 1. Health Checks
log_step "Health Checks"
log_info "Checking backend health at $BASE_URL/health..."
if ! curl -s -f "$BASE_URL/health" > /dev/null; then
    log_error "Backend is not running or not accessible at $BASE_URL."
fi
log_success "Backend is healthy."

log_info "Checking Solana Devnet connectivity..."
if ! solana cluster-version --url devnet > /dev/null 2>&1; then
    log_warning "Cannot connect to Solana Devnet. Entering MOCK mode."
    MOCK_MODE=true
else
    log_success "Solana Devnet is accessible."
fi

# 2. Authentication
log_step "Authentication"
log_info "Logging in to get JWT token..."
# Note: This assumes a user 'test@blokaid.io' with password 'password123' exists.
LOGIN_PAYLOAD='{"email": "test@blokaid.io", "password": "password123"}'
login_response=$(http_request "POST" "/auth/login" "$LOGIN_PAYLOAD")
JWT_TOKEN=$(echo "$login_response" | jq -r '.token')

if [ -z "$JWT_TOKEN" ] || [ "$JWT_TOKEN" == "null" ]; then
    log_error "Failed to get JWT token. Ensure 'test@blokaid.io' user is registered in the database."
fi
log_success "Successfully logged in and obtained JWT token."

# 3. E2E Flow
log_step "Running E2E Donation Flow"

PACKAGE_ID=$((100000 + RANDOM % 900000))

run_flow_step() {
    local step_name="$1"
    local step_info="$2"
    shift 2
    log_info "$step_name"
    if [ "$MOCK_MODE" = true ]; then
        log_warning "MOCK MODE: Simulating '$step_info'."
    else
        "$@" > /dev/null
    fi
    log_success "'$step_info' completed."
}

run_flow_step "Creating off-chain donation record..." "Donation Create" http_request "POST" "/donations" '{"txSignature": "mock_sig_...", "donorWallet": "mock_wallet_...", "amount": 1.5}'
run_flow_step "Registering new package..." "Package Register" http_request "POST" "/packages" "$(printf '{"packageId": %d, "contentHash": "hash_..."}' "$PACKAGE_ID")"
run_flow_step "Minting NFT for package..." "NFT Mint" http_request "POST" "/packages/$PACKAGE_ID/mint" '{"name": "Blokaid Demo NFT", "uri": "https://arweave.net/..."}'
run_flow_step "Simulating logistics scan..." "Package Scan" http_request "POST" "/packages/$PACKAGE_ID/scan" '{"newStatus": "InTransit"}'

# --- Final ---
echo -e "\n${GREEN}🎉🎉 E2E Demo Script finished successfully! 🎉🎉${NC}"