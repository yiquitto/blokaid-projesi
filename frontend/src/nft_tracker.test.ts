 import * as anchor from "@coral-xyz/anchor";
 import { Program } from "@coral-xyz/anchor";
 import { NftTracker } from "../target/types/nft_tracker";
 import { assert } from "chai";
 import { Keypair, SystemProgram } from "@solana/web3.js";
 
 describe("nft_tracker", () => {
   const provider = anchor.AnchorProvider.env();
   anchor.setProvider(provider);
 
   const program = anchor.workspace.NftTracker as Program<NftTracker>;
   const authority = provider.wallet as anchor.Wallet;
 
   const packageId = new anchor.BN(12345);
   const contentHash = Keypair.generate().publicKey.toBuffer(); // Use a random buffer as hash
 
   const [packagePda] = anchor.web3.PublicKey.findProgramAddressSync(
     [Buffer.from("package"), packageId.toBuffer("le", 8)],
     program.programId
   );
 
   it("Registers a new package", async () => {
     await program.methods
       .registerPackage(packageId, contentHash)
       .accounts({
         package: packagePda,
         authority: authority.publicKey,
         systemProgram: SystemProgram.programId,
       })
       .rpc();
 
     const packageAccount = await program.account.package.fetch(packagePda);
     assert.strictEqual(packageAccount.packageId.toString(), packageId.toString());
     assert.deepStrictEqual(packageAccount.contentHash, Array.from(contentHash));
     assert.ok(packageAccount.status.hasOwnProperty("registered"));
   });
 
   it("Updates package status", async () => {
     const newStatus = { inTransit: {} }; // Corresponds to PackageStatus::InTransit
 
     await program.methods
       .updateStatus(newStatus)
       .accounts({
         package: packagePda,
         authority: authority.publicKey,
       })
       .rpc();
 
     const packageAccount = await program.account.package.fetch(packagePda);
     assert.ok(packageAccount.status.hasOwnProperty("inTransit"));
   });
 
   it("Fails to update status with wrong authority", async () => {
     const wrongAuthority = Keypair.generate();
     const newStatus = { delivered: {} };
 
     try {
       await program.methods
         .updateStatus(newStatus)
         .accounts({
           package: packagePda,
           authority: wrongAuthority.publicKey,
         })
         .signers([wrongAuthority])
         .rpc();
       assert.fail("Should have failed with wrong authority");
     } catch (err) {
       assert.include(err.toString(), "ConstraintHasOne");
     }
   });
 });