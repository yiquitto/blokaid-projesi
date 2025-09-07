#!/bin/bash

# ci-smoke.sh: A script for running the full test suite in a CI environment.

set -e

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

# Wait for the server to be ready
sleep 5

pnpm newman run postman/collection.json

# Stop the temporary server
kill $BACKEND_PID
echo "✅ Newman API tests passed."

echo "🎉🎉 CI Smoke Test finished successfully! 🎉🎉"