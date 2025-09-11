import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import { DonationPool } from "../target/types/donation_pool";
import { Keypair, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";

describe("donation_pool", () => {
  // Test için ortamı ve sağlayıcıyı yapılandır.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DonationPool as Program<DonationPool>;

  // Yeni bir bağış havuzu hesabı için anahtar çifti oluştur.
  const donationPoolAccount = Keypair.generate();
  const authority = provider.wallet as anchor.Wallet;

  it("Bağış havuzunu başlatır (Initializes the donation pool)", async () => {
    // `initialize` fonksiyonunu çağırarak bağış havuzunu oluştur.
    await program.methods
      .initialize()
      .accounts({
        donationPool: donationPoolAccount.publicKey,
        user: authority.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([donationPoolAccount]) // Yeni hesap oluşturulduğu için imza gerekir.
      .rpc();

    // Hesabın doğru oluşturulup oluşturulmadığını kontrol et.
    const poolState = await program.account.donationPool.fetch(donationPoolAccount.publicKey);
    assert.strictEqual(poolState.totalDonated.toNumber(), 0, "Toplam bağış 0 olmalı.");
    assert.ok(poolState.authority.equals(authority.publicKey), "Yetkili cüzdan adresi doğru ayarlanmalı.");
  });

  it("Bağışı kabul eder (Accepts a donation)", async () => {
    const donationAmount = new anchor.BN(1 * LAMPORTS_PER_SOL); // 1 SOL bağış yap.

    // `donate` fonksiyonunu çağır.
    await program.methods
      .donate(donationAmount)
      .accounts({
        donationPool: donationPoolAccount.publicKey,
        donor: authority.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority.payer])
      .rpc();

    // Bağış sonrası havuzun durumunu kontrol et.
    const poolState = await program.account.donationPool.fetch(donationPoolAccount.publicKey);
    assert.strictEqual(poolState.totalDonated.toString(), donationAmount.toString(), "Toplam bağış miktarı doğru güncellenmeli.");
  });
});