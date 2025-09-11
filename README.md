# Blokaid - Şeffaf Yardım Platformu

Blokaid, yapılan yardımların yolculuğunu Solana blok zinciri üzerinde takip ederek, yardımlaşmada güveni ve şeffaflığı yeniden inşa eden bir platformdur. Bu proje, bağışçıların, yaptıkları yardımların ihtiyaç sahiplerine ulaşana kadar geçtiği her adımı doğrulanabilir bir şekilde görmelerini sağlar.

## ✨ Temel Özellikler

- **On-Chain Bağış:** Kullanıcılar, Solana cüzdanları ile doğrudan akıllı kontrata güvenli bir şekilde bağış yapabilirler.
- **Off-Chain Veri Yönetimi:** Kullanıcı bilgileri gibi hassas veriler, güvenli bir PostgreSQL veritabanında saklanır.
- **NFT Sertifikası:** Her başarılı bağış sonrası, bağışçı adına bu bağışı temsil eden sembolik bir "Teşekkür NFT'si" basılır.
- **Şeffaf Takip:** Yardım paketlerinin lojistik sürecindeki her adımı (hazırlanma, yola çıkma, teslim edilme) on-chain olarak kaydedilir ve herkes tarafından takip edilebilir.
- **Modern Arayüz:** TailwindCSS ile tasarlanmış, kullanıcı dostu ve karanlık tema destekli bir arayüz.

## 🛠️ Teknoloji Yığını

- **Frontend:** React, Vite, TypeScript, Redux Toolkit, TailwindCSS
- **Backend:** NestJS, TypeScript, PostgreSQL, TypeORM
- **Blockchain:** Solana, Anchor Framework, Rust
- **Containerization:** Docker, Docker Compose

## 📋 Gereksinimler

Projeyi yerel makinenizde çalıştırmak için aşağıdaki araçların yüklü olması gerekmektedir:

- **Node.js** (v20 veya üstü)
- **pnpm** (v8 veya üstü)
- **Docker & Docker Compose**
- **Solana Tool Suite**
- **Anchor Framework** (`avm install latest` ve `avm use latest`)

## 🚀 Kurulum ve Çalıştırma (Sıfırdan Başlangıç)

Sıfırdan bir bilgisayarda projeyi ayağa kaldırmak için aşağıdaki adımları izleyin.

### 1. Projeyi Klonlama

```bash
git clone https://github.com/yiquitto/blokaid-projesi.git
cd blokaid-projesi
```

### 2. Bağımlılıkları Yükleme

Projenin tüm bağımlılıklarını (frontend, backend, contracts) tek bir komutla yükleyin.

```bash
pnpm install
```

### 3. Ortam Değişkenlerini Ayarlama

Projenin `backend` ve `frontend` servisleri için gerekli olan `.env` dosyalarını oluşturmak için aşağıdaki komutu çalıştırın. Bu komut, `.env.example` dosyalarını kopyalar. Eğer `.env` dosyalarınız zaten varsa, üzerine yazılmaz.

```bash
pnpm run setup:env
```

Bu komut, `backend/.env.example` ve `frontend/.env.example` dosyalarını kopyalayarak `backend/.env` ve `frontend/.env` dosyalarını oluşturur. Veritabanı şifresi gibi hassas bilgileri bu dosyalarda düzenlemeniz gerekebilir.

### 4. Akıllı Kontratları Dağıtma (Deployment)

Uygulamanın çalışması için Solana akıllı kontratlarının Devnet'e dağıtılması gerekir.

**a. Cüzdanı Fonlama:** Dağıtım işlemi gas ücreti gerektirir. Cüzdanınızda yeterli Devnet SOL yoksa, aşağıdaki komutla cüzdanınıza SOL talep edin.
```bash
pnpm run solana:fund
```

**b. Kontratları Dağıtma:** Aşağıdaki script, kontratları derler, Devnet'e dağıtır ve oluşan Program ID'lerini otomatik olarak `.env.example` dosyalarınıza yazar.
```bash
pnpm run solana:deploy
```

**c. `.env` Dosyalarını Güncelleme:** `pnpm run setup` komutunu tekrar çalıştırarak yeni oluşturulan Program ID'lerinin `.env` dosyalarınıza aktarılmasını sağlayın.

### 5. Uygulamayı Çalıştırma

Projeyi çalıştırmak için iki ana yöntem bulunmaktadır:


**Yöntem A: Docker ile (Önerilen)**

Bu yöntem, veritabanı dahil tüm servisleri tek bir komutla ayağa kaldırır.

```bash
pnpm run stack -- up
```

Uygulama artık `http://localhost:8080` adresinde çalışıyor olacaktır.

**Yöntem B: Yerel Geliştirme Ortamı**

Servisleri ayrı terminallerde manuel olarak çalıştırmak için:

```bash
# Terminal 1: Backend'i başlat
pnpm --filter backend dev

# Terminal 2: Frontend'i başlat
pnpm --filter frontend dev
```

Bu durumda, PostgreSQL veritabanınızın yerel olarak çalıştığından ve `backend/.env` dosyasındaki bağlantı bilgilerinin doğru olduğundan emin olmalısınız.

## scripts/ Kullanılabilir Komutlar

- `pnpm dev`: Frontend ve backend'i geliştirme modunda başlatır.
- `pnpm build`: Tüm alt projeleri derler.
- `pnpm lint`: Kod formatını kontrol eder.
- `pnpm test`: Tüm testleri çalıştırır.
- `pnpm run stack -- [up|down|logs]`: Docker yığınını yönetir.
- `pnpm run solana:deploy`: Akıllı kontratları Devnet'e dağıtır.
- `pnpm run solana:fund`: Varsayılan cüzdanınıza Devnet SOL talep eder.
