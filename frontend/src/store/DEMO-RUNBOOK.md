# Blokaid - Canlı Demo Akışı

**Amaç:** Blokaid platformunun şeffaflık, takip edilebilirlik ve güvenilirlik vaatlerini 5 dakikalık etkili bir demo ile sergilemek.

**Konuşmacı:** [İsim Soyisim]

**Roller:**
- **Sunucu:** Demo akışını yöneten ve anlatan kişi.
- **Yardımsever (Alice):** Bağış yapan kullanıcı rolü.
- **Lojistik Sorumlusu (Bob):** Yardım paketini taşıyan ve QR kod okutan kişi.
- **İhtiyaç Sahibi (Charlie):** Yardımı teslim alan son kullanıcı.

---

## Senaryo: Bir Yardım Paketinin Yolculuğu

### Adım 1: Giriş ve Platform Tanıtımı (30 saniye)

- **Ekran:** `http://localhost:8080` (Dashboard)
- **Aksiyon:**
  - "Merhaba, ben [İsim] ve bu Blokaid. Blokaid, yapılan yardımların gerçekten ihtiyaç sahiplerine ulaşıp ulaşmadığı sorununu blok zinciri teknolojisiyle çözen şeffaf bir yardım platformudur."
  - "Bugün size bir bağışın nasıl bir hayatı değiştirdiğini, bir yardım paketinin yolculuğunu baştan sona, %100 şeffaf bir şekilde göstereceğiz."
  - Dashboard'daki genel istatistiklere (toplam bağış, ulaştırılan paket sayısı vb.) kısaca değin.

### Adım 2: Bağış Yapma (Alice'in Rolü) (1 dakika)

- **Ekran:** Donate Sayfası
- **Aksiyon:**
  - "Şimdi, yardımsever bir vatandaş olan Alice olarak platforma giriş yapıyorum ve bir bağışta bulunacağım."
  - Sağ üstten "Connect Wallet" butonu ile Phantom cüzdanını bağla.
  - Bağış formuna bir miktar (örn: 1 SOL) gir.
  - "Donate" butonuna tıkla. Cüzdandan gelen işlem onayı penceresini göster ve onayla.
  - "İşte bu kadar! Yaptığım bağış şu anda Solana blok zincirine kaydedildi. Bu işlem, değiştirilemez ve herkes tarafından doğrulanabilir."
  - Backend'in bu işlemi yakalayıp veritabanına kaydettiğini ve bir "paket" oluşturduğunu belirt.

### Adım 3: Paketin Lojistik Süreci (Bob'un Rolü) (1.5 dakika)

- **Ekran:** Mobil telefon ekranı yansıtılmış, Scan sayfası açık.
- **Aksiyon:**
  - "Şimdi rol değiştiriyoruz. Ben lojistik sorumlusu Bob. Alice'in bağışıyla hazırlanan yardım paketini teslim aldım. Üzerindeki QR kodu telefonumla okutuyorum."
  - Telefon kamerasını kullanarak önceden hazırlanmış bir QR kodu (paket ID'sini içeren) okut.
  - Ekranda paketin bilgilerinin belirdiğini ve "Update Status" butonunun çıktığını göster.
  - "Paketi yola çıkardım" diyerek durumu "In Transit" olarak güncelle. Bu işlemin de blok zincirine kaydedildiğini vurgula.