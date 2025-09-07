# Blokaid v1.0.0 - Teknofest Sürümü

Bu belge, Blokaid projesinin v1.0.0 sürümünün detaylarını içermektedir.

## ✨ Yenilikler

- **Donation Pool Programı:** Multisig ve timelock özellikli ana bağış havuzu akıllı kontratı Devnet'e dağıtıldı.
- **NFT Tracker Programı:** Yardım paketlerinin durumunu takip eden akıllı kontrat Devnet'e dağıtıldı.
- **Backend API v1:** Kullanıcı kaydı, giriş, bağış kaydı ve paket durumu güncelleme için temel API endpoint'leri tamamlandı.
- **Frontend Arayüzü v1:** Kullanıcıların cüzdan bağlayabildiği, bağış yapabildiği ve paketlerini takip edebildiği ana arayüz geliştirildi.
- **Docker Entegrasyonu:** Tüm projenin `docker-compose` ile tek komutta ayağa kaldırılması sağlandı.

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Docker & Docker Compose
- Node.js v20+
- pnpm v8+
- Solana Tool Suite

### Adımlar

1.  **.env Dosyalarını Hazırlama:**
    ```bash
    # Kök dizinde
    bash ./scripts/setup-dev.sh
    # backend/.env ve frontend/.env dosyalarını kendi ayarlarınızla güncelleyin.
    ```

2.  **Docker ile Başlatma (Önerilen):**
    ```bash
    # Kök dizinde
    bash ./scripts/dev.sh up
    ```
    Uygulamaya `http://localhost:8080` adresinden erişilebilir.

## ⚠️ Bilinen Sorunlar

- QR kod okuma sayfası mobil tarayıcılar için optimize edilmiştir.
- E-posta doğrulama ve şifre sıfırlama özellikleri henüz eklenmemiştir.