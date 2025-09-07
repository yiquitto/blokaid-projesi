 use anchor_lang::prelude::*;
 
 pub const MAX_OWNERS: usize = 5;
 
 /// The main state account for the donation pool.
 #[account]
 pub struct PoolState {
     /// The authority that created the pool (can be a system admin).
     pub authority: Pubkey,
     /// The public keys of the multisig owners.
     pub owners: Vec<Pubkey>,
     /// The number of signatures required for a proposal.
     pub threshold: u8,
     /// Total amount of SOL (in lamports) donated to the pool.
     pub total_donated: u64,
     /// A flag to lock the pool from further donations.
     pub is_locked: bool,
     /// A counter for creating unique proposal IDs.
     pub proposal_index: u64,
     /// Bump seed for the PDA.
     pub bump: u8,
 }
 
 impl PoolState {
     // Constant space for the PoolState account.
     // 32 (authority) + 4 + (5 * 32) (owners vec) + 1 (threshold) + 8 (total_donated)
     // + 1 (is_locked) + 8 (proposal_index) + 1 (bump) + 8 (discriminator)
     pub const SPACE: usize = 8 + 32 + (4 + MAX_OWNERS * 32) + 1 + 8 + 1 + 8 + 1;
 }
 
 /// Represents a withdrawal proposal.
 #[account]
 pub struct WithdrawalProposal {
     /// The pool this proposal belongs to.
     pub pool: Pubkey,
     /// A unique ID for the proposal.
     pub index: u64,
     /// The amount to be withdrawn.
     pub amount: u64,
     /// The recipient of the funds.
     pub recipient: Pubkey,
     /// The public keys of the owners who have approved this proposal.
     pub approvals: Vec<Pubkey>,
     /// The timestamp when the proposal was created.
     pub created_at: i64,
     /// A flag indicating if the proposal has been executed.
     pub executed: bool,
 }
 
 impl WithdrawalProposal {
     // 8 (discriminator) + 32 (pool) + 8 (index) + 8 (amount) + 32 (recipient)
     // + 4 + (5 * 32) (approvals vec) + 8 (created_at) + 1 (executed)
     pub const SPACE: usize = 8 + 32 + 8 + 8 + 32 + (4 + MAX_OWNERS * 32) + 8 + 1;
 }