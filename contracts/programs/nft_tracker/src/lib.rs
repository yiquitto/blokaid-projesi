use anchor_lang::prelude::*;

// Bu adres, `anchor deploy` komutu çalıştırıldığında otomatik olarak güncellenir.
declare_id!("TRackNFTsP1aceho1der11111111111111111111111");

#[program]
pub mod nft_tracker {
    use super::*;

    /// Yeni bir yardım paketi için on-chain bir kayıt oluşturur.
    pub fn create_package(ctx: Context<CreatePackage>, package_id_str: String, initial_status: String) -> Result<()> {
        let package_account = &mut ctx.accounts.package_account;
        package_account.authority = ctx.accounts.authority.key();
        package_account.package_id = package_id_str;
        package_account.status = initial_status;
        package_account.mint = Pubkey::default(); // Başlangıçta NFT mint adresi boş
        Ok(())
    }

    /// Mevcut bir paketin durumunu günceller (örn: "Yola Çıktı", "Teslim Edildi").
    pub fn update_status(ctx: Context<UpdatePackage>, new_status: String) -> Result<()> {
        let package_account = &mut ctx.accounts.package_account;
        package_account.status = new_status;
        Ok(())
    }

    /// Basılan bir NFT'yi on-chain paket kaydıyla ilişkilendirir.
    pub fn link_mint(ctx: Context<UpdatePackage>, mint_pubkey: Pubkey) -> Result<()> {
        let package_account = &mut ctx.accounts.package_account;
        package_account.mint = mint_pubkey;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(package_id_str: String)]
pub struct CreatePackage<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + (4 + package_id_str.len()) + (4 + 50) + 32, // Alanlara göre boyut hesaplaması
        seeds = [b"package", package_id_str.as_bytes()],
        bump
    )]
    pub package_account: Account<'info, PackageAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePackage<'info> {
    #[account(mut, has_one = authority)]
    pub package_account: Account<'info, PackageAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct PackageAccount {
    pub authority: Pubkey,    // Bu kaydı güncelleme yetkisine sahip olan (genellikle backend cüzdanı)
    pub package_id: String,   // Veritabanındaki paket ID'si
    pub status: String,       // Paketin mevcut durumu
    pub mint: Pubkey,         // İlişkili NFT'nin mint adresi
}