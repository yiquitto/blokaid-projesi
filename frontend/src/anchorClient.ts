import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { DonationPool } from '../../../contracts/target/types/donation_pool';
import { NftTracker } from '../../../contracts/target/types/nft_tracker';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

import idlDonation from '../../../contracts/target/idl/donation_pool.json';
import idlTracker from '../../../contracts/target/idl/nft_tracker.json';

export function getAnchorProvider() {
  const connection = new Connection(process.env.SOLANA_RPC_URL!, 'confirmed');
  // The wallet needs to be able to pay for transactions.
  // For production, use a secure way to load a keypair (e.g., from a secret manager).
  const wallet = new NodeWallet(Keypair.generate()); // Placeholder wallet

  return new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
}

export function getDonationPoolProgram(provider: AnchorProvider): Program<DonationPool> {
  return new Program(idlDonation as any, new PublicKey(process.env.DONATION_POOL_PROGRAM_ID!), provider);
}

export function getNftTrackerProgram(provider: AnchorProvider): Program<NftTracker> {
  return new Program(idlTracker as any, new PublicKey(process.env.NFT_TRACKER_PROGRAM_ID!), provider);
}