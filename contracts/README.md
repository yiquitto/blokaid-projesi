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

Aşağıdaki komut, projenin **kök dizininden** çalıştırılmalıdır. Bu script sırasıyla:
1.  Programları derler (`anchor build`).
2.  Programları Devnet'e dağıtır (`anchor deploy`).
3.  Dağıtım sonrası oluşan program ID'lerini yakalar.
4.  ID'leri `backend` ve `frontend` klasörlerindeki `.env` ve `.env.example` dosyalarına ekler.

```bash
pnpm run solana:deploy
```

### Rollback Stratejisi

Bir programın önceki bir versiyonuna geri dönmek (rollback) için, ilgili programın kodunu içeren önceki bir Git commit'ine geçiş yapın (`git checkout <commit_hash> -- contracts/programs/program_adi`) ve `pnpm run solana:deploy` komutunu yeniden çalıştırın. Bu, eski kodun üzerine yeni bir dağıtım yapacaktır.

### Akıllı Kontratları Tek Tek Güncelleme (Upgrade)

Projenin `pnpm run solana:deploy` script'i, tüm programları aynı anda dağıtmak için önerilen yöntemdir. Ancak, geliştirme sırasında sadece **tek bir programı** hızlıca güncellemek isterseniz, bunun için özel olarak hazırlanmış `solana:upgrade` script'ini kullanabilirsiniz.

Bu script, `anchor upgrade` komutunu sizin için doğru argümanlarla çalıştırarak manuel hata yapma riskini ortadan kaldırır.

**Neden Bu Script'i Kullanmalısınız?**

Manuel olarak `anchor upgrade --program-id <ID> <DOSYA_YOLU>` komutunu çalıştırmak, doğru program ID'sini ve `.so` dosya yolunu bulmayı gerektirir. Bu script, bu süreci sizin için otomatikleştirerek `program-id` veya `program_filepath` gibi argümanların eksik olmasından kaynaklanan hataları tamamen önler.

**Kullanım:**

Aşağıdaki komutu projenin **kök dizininden** çalıştırın ve `<program_adı>` kısmını güncellemek istediğiniz programın adıyla (örneğin `donation_pool` veya `nft_tracker`) değiştirin.

```bash
# Genel kullanım
pnpm solana:upgrade <program_adı>
# Örnek
pnpm solana:upgrade donation_pool
```

**Önemli Notlar:**
- `declare_id!` makrosu (`lib.rs` içinde) ile güncellediğiniz programın ID'si tutarlı olmalıdır.
- Program hesaplarında SOL bulunmamalıdır.
- Güncelleme yetkisine (`upgrade authority`) sahip olan cüzdan ile bu işlemi yapmanız gerekir.

### Gas ve Dağıtım Maliyetleri

`anchor deploy` komutunun çıktısı, her bir program için dağıtımın maliyetini (gerekli olan rent ücreti) SOL cinsinden gösterir. Bu maliyet, programın boyutuna göre değişir.
