#!/bin/bash
set -e

# This script is executed after the container is created.

# Define the shell profile file. The default shell for the container is bash.
PROFILE_FILE="/home/vscode/.bashrc"

echo "---"
echo "Updating package list and installing jq..."
sudo apt-get update > /dev/null
sudo apt-get install -y jq

echo "---"
echo "Installing pnpm..."
sudo npm install -g pnpm@8

echo "---"
echo "Installing project dependencies with pnpm..."
pnpm i

echo "---"
echo "Configuring shell environment for Rust/Cargo..."
# Source the cargo env script to make cargo commands available in this script
# and add it to the bashrc for future terminals.
if ! grep -q 'source "$HOME/.cargo/env"' "$PROFILE_FILE"; then
    echo '' >> "$PROFILE_FILE"
    echo '# Add Rust/Cargo to PATH' >> "$PROFILE_FILE"
    echo 'source "$HOME/.cargo/env"' >> "$PROFILE_FILE"
fi
# Source it for the current script session
# shellcheck source=/dev/null
source "$HOME/.cargo/env"

echo "---"
echo "Installing Anchor Version Manager (avm)..."
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

echo "---"
echo "Installing latest Anchor version..."
avm install latest
avm use latest

echo "---"
echo "✅ Dev container setup complete."
echo "Open a new terminal to use solana and anchor."