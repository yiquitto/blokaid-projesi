use anchor_lang::prelude::*;

pub mod errors;
pub mod events;
pub mod instructions;
pub mod state;

use instructions::*;
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod donation_pool {
    use super::*;

    /// Initializes a new donation pool with a set of owners and a multisig threshold.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    /// * `owners` - A vector of public keys for the multisig owners.
    /// * `threshold` - The number of signatures required to approve a proposal.
    pub fn initialize(
        ctx: Context<InitializePool>,
        owners: Vec<Pubkey>,
        threshold: u8,
    ) -> Result<()> {
        instructions::initialize::handler(ctx, owners, threshold)
    }

    /// Allows a user to donate SOL to the pool.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    /// * `amount` - The amount of SOL to donate in lamports.
    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        instructions::donate::handler(ctx, amount)
    }

    /// Locks the fund, preventing further donations and allowing withdrawal proposals.
    /// Can only be called by a pool owner.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    pub fn lock_funds(ctx: Context<LockFunds>) -> Result<()> {
        instructions::lock_funds::handler(ctx)
    }

    /// Creates a withdrawal proposal.
    /// Can only be called by a pool owner after the fund is locked.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    /// * `amount` - The amount of SOL to withdraw.
    /// * `recipient` - The public key of the recipient.
    pub fn propose_withdrawal(
        ctx: Context<ProposeWithdrawal>,
        amount: u64,
        recipient: Pubkey,
    ) -> Result<()> {
        instructions::propose_withdrawal::handler(ctx, amount, recipient)
    }

    /// Approves a withdrawal proposal.
    /// Can only be called by a pool owner who has not already approved it.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    pub fn approve_proposal(ctx: Context<ApproveProposal>) -> Result<()> {
        instructions::approve_proposal::handler(ctx)
    }

    /// Executes a withdrawal proposal if it has enough approvals and the timelock has passed.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    pub fn execute_proposal(ctx: Context<ExecuteProposal>) -> Result<()> {
        instructions::execute_proposal::handler(ctx)
    }
}
