 use anchor_lang::prelude::*;
 
 #[error_code]
 pub enum PoolError {
     #[msg("Invalid number of owners. Must be between 1 and 5.")]
     InvalidOwnerCount,
     #[msg("Invalid threshold. Must be greater than 0 and not exceed the number of owners.")]
     InvalidThreshold,
     #[msg("The signer is not an owner of the pool.")]
     NotAnOwner,
     #[msg("The pool is locked and does not accept donations.")]
     PoolLocked,
     #[msg("The pool is not locked yet. Proposals cannot be made.")]
     PoolNotLocked,
     #[msg("The proposal has already been approved by this owner.")]
     AlreadyApproved,
     #[msg("The proposal does not have enough approvals to be executed.")]
     NotEnoughApprovals,
     #[msg("The proposal has already been executed.")]
     AlreadyExecuted,
     #[msg("The timelock period has not passed yet.")]
     TimelockNotExpired,
     #[msg("Withdrawal amount exceeds the total donated amount.")]
     InsufficientFunds,
 }