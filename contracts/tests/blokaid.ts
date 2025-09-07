import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
// Programlarınızı import edin (Anchor build sonrası oluşacak types klasöründen)
// import { DonationPool } from "../target/types/donation_pool";
// import { NftTracker } from "../target/types/nft_tracker";

describe("blokaid", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Programları yükleyin
  // const donationPoolProgram = anchor.workspace.DonationPool as Program<DonationPool>;
  // const nftTrackerProgram = anchor.workspace.NftTracker as Program<NftTracker>;

  it("Is initialized!", async () => {
    // Add your test here.
    // Örnek bir test:
    // const tx = await donationPoolProgram.methods.initialize().rpc();
    // console.log("Your transaction signature", tx);
    assert.isTrue(true); // Placeholder test
  });
});
