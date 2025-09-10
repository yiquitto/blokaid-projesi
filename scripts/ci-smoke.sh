#!/bin/bash

# ci-smoke.sh: A script for running the full test suite in a CI environment.
# This script should be run from the project root.

set -e

# Function to ensure the backend server is stopped on exit
cleanup() {
  if [ -n "$BACKEND_PID" ]; then
    echo "--- 5. Stopping temporary backend server (PID: $BACKEND_PID) ---"
    kill "$BACKEND_PID" || echo "Backend server was not running."
  fi
}

# Register the cleanup function to be called on script exit
trap cleanup EXIT

echo "🚀 Starting CI Smoke Test..."

echo "--- 1. Building all packages ---"
pnpm -r build
echo "✅ Build complete."

echo "--- 2. Running Anchor contract tests ---"
(
  cd contracts
  anchor test
)
echo "✅ Anchor tests passed."

echo "--- 3. Running Backend Jest tests ---"
(
  cd backend
  pnpm test
)
echo "✅ Backend tests passed."

echo "--- 4. Running Postman/Newman API tests ---"
echo "Starting a temporary backend server for Newman..."

# Start backend in the background
(cd backend && pnpm start &)
BACKEND_PID=$!

echo "Waiting for backend server to be ready..."

# Wait for the server to be ready by polling the health endpoint
retries=30
while [ $retries -gt 0 ]; do
  if curl -s -f http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend server is up and running."
    break
  fi
  retries=$((retries - 1))
  sleep 2
done

if [ $retries -eq 0 ]; then
  echo "❌ Backend server failed to start in time."
  exit 1
fi

pnpm newman run postman/collection.json

echo "✅ Newman API tests passed."

echo "🎉🎉 CI Smoke Test finished successfully! 🎉🎉"