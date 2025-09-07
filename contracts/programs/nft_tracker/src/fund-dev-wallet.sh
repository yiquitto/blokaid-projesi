#!/bin/bash

# This script requests SOL from the Devnet faucet for your default wallet.

set -e

WALLET_PUBKEY=$(solana-keygen pubkey)

echo "🔑 Your default wallet public key is: $WALLET_PUBKEY"
echo "💸 Requesting 2 SOL from the Devnet faucet..."

solana airdrop 2 "$WALLET_PUBKEY" --url https://api.devnet.solana.com

echo "✅ Airdrop request sent. Check your balance with 'solana balance'."