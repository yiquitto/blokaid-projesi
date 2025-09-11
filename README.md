# Blokaid - Şeffaf Yardım Platformu

Blokaid, yapılan yardımların yolculuğunu Solana blok zinciri üzerinde takip ederek şeffaflığı ve güveni merkeze alan modern bir yardım platformudur.

## ✨ Temel Özellikler

- **On-Chain Bağış:** Kullanıcılar, Solana cüzdanları ile doğrudan akıllı kontrata güvenli bir şekilde bağış yapabilirler.
- **NFT Sertifikası:** Her başarılı bağış sonrası, bağışçı adına bu bağışı temsil eden sembolik bir "Teşekkür NFT'si" basılır.
- **Şeffaf Takip:** Yardım paketlerinin lojistik sürecindeki her adımı (hazırlanma, yola çıkma, teslim edilme) on-chain olarak kaydedilir ve herkes tarafından takip edilebilir.
- **Güvenli Veri Mimarisi:** Hassas kullanıcı verileri (KVKK uyumlu) off-chain (PostgreSQL), şeffaf lojistik verileri ise on-chain (Solana) saklanır.

## 🛠️ Teknoloji Yığını

- **Frontend:** React, Vite, TypeScript, Redux Toolkit, TailwindCSS
- **Backend:** NestJS, TypeScript, PostgreSQL, TypeORM
- **Blockchain:** Solana, Anchor Framework, Rust
- **Containerization & Otomasyon:** Docker, Docker Compose, Nginx, Node.js Scripts

## 🚀 Hızlı Başlangıç (Docker ile)

Bu kılavuz, projeyi Docker kullanarak **tek bir komutla** ayağa kaldırmanız için tasarlanmıştır. Bu yöntem, tüm servisleri (veritabanı, backend, frontend vb.) sizin için otomatik olarak kurar ve yapılandırır.

### 1. Ön Gereksinimler

Makinenizde aşağıdaki araçların kurulu olduğundan emin olun:

- **Node.js** (v20 veya üstü)
- **pnpm** (v8 veya üstü)
- **Docker & Docker Compose**
- **Solana Tool Suite**
- **Anchor Framework** (`avm install latest` ve `avm use latest`)
 
### 2. Kurulum ve Çalıştırma
 
Aşağıdaki komutları projenin ana dizininde sırasıyla çalıştırın.
 
1.  **Projeyi klonlayın ve dizine girin:**
    ```bash
    git clone https://github.com/yiquitto/blokaid-projesi.git
    cd blokaid-projesi
    ```
 
2.  **Tüm bağımlılıkları yükleyin:**
    ```bash
    pnpm install
    ```
 
3.  **Ortam değişkeni dosyalarını oluşturun:**
    Bu komut, `.env.example` dosyalarını kopyalayarak `.env` dosyalarını oluşturur.
    ```bash
    pnpm run setup:env
    ```
 
4.  **Akıllı kontratları dağıtın:**
    Bu script, kontratları derler, Solana Devnet'e dağıtır ve gerekli Program ID'lerini `.env` dosyalarınıza **otomatik olarak** yazar.
    ```bash
    pnpm run solana:deploy
    ```
    *Not: Cüzdanınızda Devnet SOL yoksa, dağıtım öncesi `pnpm run solana:fund` komutunu çalıştırın.*
 
5.  **Tüm sistemi Docker ile başlatın:**
    Bu komut, Nginx, Backend, Frontend, PostgreSQL ve Redis servislerini içeren tüm sistemi ayağa kaldırır.
    ```bash
    pnpm run stack -- up
    ```
 
🎉 Tebrikler! Proje artık **http://localhost:8080** adresinde çalışıyor.
 
---
 
## 📚 Proje Komutları
 
Aşağıda, projenin kök dizininde kullanabileceğiniz temel komutların bir listesi bulunmaktadır.
 
| Komut                          | Açıklama                                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `pnpm install`                 | Tüm proje (`frontend`, `backend`, `contracts`) bağımlılıklarını yükler.                                |
| `pnpm run setup:env`           | `.env.example` dosyalarından `.env` dosyalarını oluşturur.                                           |
| `pnpm dev`                     | Frontend ve backend'i geliştirme modunda (Docker olmadan) başlatır.                                  |
| `pnpm build`                   | Frontend ve backend projelerini üretim için derler.                                                  |
| `pnpm test`                    | Tüm alt projelerdeki (`frontend`, `backend`, `contracts`) testleri çalıştırır.                         |
| `pnpm lint`                    | Prettier ile tüm projede kod formatını kontrol eder.                                                 |
| `pnpm run stack -- [args]`     | Docker yığınını yönetir (`up`, `down`, `logs`, `build` vb.).                                           |
| `pnpm run solana:deploy`       | Akıllı kontratları Devnet'e dağıtır ve `.env` dosyalarını otomatik günceller.                          |
| `pnpm run solana:upgrade [ad]` | Sadece belirtilen akıllı kontratı (`donation_pool` veya `nft_tracker`) hızlıca günceller.             |
| `pnpm run solana:fund`         | Varsayılan cüzdanınıza 2 Devnet SOL talep eder.                                                        |
