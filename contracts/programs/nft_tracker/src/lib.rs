use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnT");

pub mod errors;
pub mod state;

use errors::TrackerError;
use state::*;

#[program]
pub mod nft_tracker {
    use super::*;

    /// Registers a new package on-chain.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    /// * `package_id` - A unique identifier for the package.
    /// * `content_hash` - A hash representing the package contents.
    pub fn register_package(
        ctx: Context<RegisterPackage>,
        package_id: u64,
        content_hash: [u8; 32],
    ) -> Result<()> {
        let package = &mut ctx.accounts.package;
        package.authority = *ctx.accounts.authority.key;
        package.package_id = package_id;
        package.content_hash = content_hash;
        package.status = PackageStatus::Registered;
        package.created_at = Clock::get()?.unix_timestamp;
        package.updated_at = package.created_at;
        Ok(())
    }

    /// Updates the status of a package.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    /// * `new_status` - The new status for the package.
    pub fn update_status(ctx: Context<UpdateStatus>, new_status: PackageStatus) -> Result<()> {
        let package = &mut ctx.accounts.package;
        // Security: Ensure the final status cannot be reverted.
        require!(
            package.status != PackageStatus::Delivered,
            TrackerError::PackageAlreadyDelivered
        );
        package.status = new_status;
        package.updated_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    /// Verifies a package scan, typically updating its status to 'InTransit'.
    ///
    /// # Arguments
    ///
    /// * `ctx` - The context for this instruction.
    pub fn verify_scan(ctx: Context<UpdateStatus>) -> Result<()> {
        let package = &mut ctx.accounts.package;
        require!(
            package.status != PackageStatus::Delivered,
            TrackerError::PackageAlreadyDelivered
        );
        package.status = PackageStatus::InTransit;
        package.updated_at = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(package_id: u64)]
pub struct RegisterPackage<'info> {
    #[account(
        init,
        payer = authority,
        space = Package::SPACE,
        seeds = [b"package", &package_id.to_le_bytes()],
        bump
    )]
    pub package: Account<'info, Package>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateStatus<'info> {
    #[account(mut, has_one = authority)]
    pub package: Account<'info, Package>,
    pub authority: Signer<'info>,
}
