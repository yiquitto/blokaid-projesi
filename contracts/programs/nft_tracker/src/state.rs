 use anchor_lang::prelude::*;
 
 #[account]
 pub struct Package {
     /// The authority that can update the package status.
     pub authority: Pubkey,
     /// A unique identifier for the package.
     pub package_id: u64,
     /// A hash of the package contents for verification.
     pub content_hash: [u8; 32],
     /// The current status of the package.
     pub status: PackageStatus,
     /// Timestamp of creation.
     pub created_at: i64,
     /// Timestamp of the last update.
     pub updated_at: i64,
 }
 
 impl Package {
     // 8 (discriminator) + 32 (authority) + 8 (package_id) + 32 (hash)
     // + 1 + 1 (status enum) + 8 (created_at) + 8 (updated_at)
     pub const SPACE: usize = 8 + 32 + 8 + 32 + 2 + 8 + 8;
 }
 
 #[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
 pub enum PackageStatus {
     Registered,
     InTransit,
     Delivered,
     VerificationFailed,
 }