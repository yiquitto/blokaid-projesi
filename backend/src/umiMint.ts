import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createNft,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import { Keypair, PublicKey } from '@solana/web3.js';
import { keypairIdentity, generateSigner, percentAmount } from '@metaplex-foundation/umi';

/**
 * Mints a new NFT for a given package.
 * @param authorityKeypair The keypair of the wallet that will pay for the mint and be the authority.
 * @param packageName The name of the NFT.
 * @param packageUri The URI for the NFT's metadata JSON.
 * @returns The public key of the newly minted NFT.
 */
export async function mintPackageNft(
  authorityKeypair: Keypair,
  packageName: string,
  packageUri: string
): Promise<PublicKey> {
  const umi = createUmi(process.env.SOLANA_RPC_URL!).use(mplTokenMetadata());

  // Set the authority for the UMI instance
  const authorityUmiKeypair = umi.eddsa.createKeypairFromSecretKey(authorityKeypair.secretKey);
  umi.use(keypairIdentity(authorityUmiKeypair));

  const mint = generateSigner(umi);

  const result = await createNft(umi, {
    mint,
    name: packageName,
    uri: packageUri,
    sellerFeeBasisPoints: percentAmount(5.5), // 5.5%
  }).sendAndConfirm(umi);

  if (!result.signature) {
    throw new Error('Failed to confirm NFT mint transaction.');
  }

  return new PublicKey(mint.publicKey);
}