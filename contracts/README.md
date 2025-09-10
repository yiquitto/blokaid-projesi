# Akıllı Kontratlar (Contracts)

Bu paket, Blokaid projesinin Solana akıllı kontratlarını (programlarını) içerir. Geliştirme için [Anchor Framework](https://www.anchor-lang.com/) kullanılmaktadır.

Bu bir Anchor workspace'idir. Her bir ana özellik kendi programı altında geliştirilecektir:
- `donation_pool`: Bağış havuzlarını yöneten program.
- `nft_tracker`: Bağışçılara verilen NFT'leri ve bunların takibini yöneten program.

## Komutlar

Bu klasörün içindeyken aşağıdaki Anchor komutlarını kullanabilirsiniz:

- `anchor build`: Tüm programları derler.
- `anchor test`: `tests/` klasöründeki testleri çalıştırır.
- `anchor deploy`: Derlenmiş programları Solana ağına (devnet, mainnet vb.) deploy eder.
 
## Devnet'e Dağıtım (Deployment)
 
Bu programları Devnet'e dağıtmak için projenin kök dizininde bulunan otomatize edilmiş script'ler kullanılmalıdır.

### 1. Cüzdanı Fonlama

Dağıtım işlemi gas ücreti gerektirir. Eğer Devnet cüzdanınızda yeterli SOL yoksa, aşağıdaki script'i **proje kök dizininden** çalıştırarak 2 SOL talep edebilirsiniz:

```bash
pnpm run solana:fund
```

### 2. Dağıtım Script'ini Çalıştırma

Aşağıdaki komut, projenin kök dizininden çalıştırılmalıdır. Bu script sırasıyla:
1.  Programları derler (`anchor build`).
2.  Programları Devnet'e dağıtır (`anchor deploy`).
3.  Dağıtım sonrası oluşan program ID'lerini yakalar.
4.  ID'leri `contracts/program-ids.json` dosyasına yazar.
5.  ID'leri `backend/.env.example` ve `frontend/.env.example` dosyalarına ekler.

```bash
bash ./scripts/devnet-deploy.sh
```

### Rollback Stratejisi

Bir programın önceki bir versiyonuna geri dönmek (rollback) için, ilgili programın kodunu içeren önceki bir Git commit'ine geçiş yapın (`git checkout <commit_hash> -- contracts/programs/program_adi`) ve `devnet-deploy.sh` script'ini yeniden çalıştırın. Bu, eski kodun üzerine yeni bir dağıtım yapacaktır.

### Gas ve Dağıtım Maliyetleri

`anchor deploy` komutunun çıktısı, her bir program için dağıtımın maliyetini (gerekli olan rent ücreti) SOL cinsinden gösterir. Bu maliyet, programın boyutuna göre değişir.
