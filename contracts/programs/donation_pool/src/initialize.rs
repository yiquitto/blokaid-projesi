use crate::{errors::PoolError, state::*};
use anchor_lang::prelude::*;

pub fn handler(ctx: Context<InitializePool>, owners: Vec<Pubkey>, threshold: u8) -> Result<()> {
    // Security: Check for valid owner count and threshold
    require!(
        !owners.is_empty() && owners.len() <= MAX_OWNERS,
        PoolError::InvalidOwnerCount
    );
    require!(
        threshold > 0 && threshold as usize <= owners.len(),
        PoolError::InvalidThreshold
    );

    let pool = &mut ctx.accounts.pool;
    pool.authority = *ctx.accounts.authority.key;
    pool.owners = owners;
    pool.threshold = threshold;
    pool.total_donated = 0;
    pool.is_locked = false;
    pool.proposal_index = 0;
    pool.bump = ctx.bumps.pool;

    Ok(())
}

#[derive(Accounts)]
pub struct InitializePool<'info> {
    #[account(
        init,
        payer = authority,
        space = PoolState::SPACE,
        seeds = [b"pool", authority.key().as_ref()],
        bump
    )]
    pub pool: Account<'info, PoolState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}