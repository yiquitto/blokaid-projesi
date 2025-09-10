use anchor_lang::prelude::*;

// Bu adres, `anchor deploy` komutu çalıştırıldığında otomatik olarak güncellenir.
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod donation_pool {
    use super::*;

    /// Yeni bir bağış havuzu hesabı oluşturur.
    /// Bu fonksiyon, genellikle projenin başında bir kere çağrılır.
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let donation_pool = &mut ctx.accounts
.donation_pool;
        donation_pool.total_donated = 0;
        donation_pool.authority = *ctx.accounts.user.key;
        msg!("Donation pool initialized!");
        Ok(())
    }

    /// Bir bağışçının havuza SOL katkısında bulunmasını sağlar.
    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        let donor = &ctx.accounts.donor;
        let donation_pool = &mut ctx.accounts.donation_pool;

        // Sistem programını kullanarak transfer talimatını oluştur
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &donor.key(),
            &donation_pool.key(),
            amount,
        );

        // Transferi gerçekleştir
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                donor.to_account_info(),
                donation_pool.to_account_info(),
            ],
        )?;

        // Toplam bağış miktarını güncelle
        donation_pool.total_donated = donation_pool.total_donated.checked_add(amount).unwrap();
        
        msg!("Donation of {} lamports received. Thank you!", amount);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8 + 32)] // Discriminator + u64 + Pubkey
    pub donation_pool: Account<'info, DonationPool>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub donation_pool: Account<'info, DonationPool>,
    #[account(mut)]
    pub donor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct DonationPool {
    pub total_donated: u64,
    pub authority: Pubkey,
}