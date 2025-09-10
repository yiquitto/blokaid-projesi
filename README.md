# BLOKAID Projesi

BLOKAID, [Projenin kısa ve net bir tanımını buraya ekleyin]. Bu monorepo, projenin tüm bileşenlerini (akıllı kontratlar, backend, frontend ve altyapı) tek bir çatı altında barındırır.

## Teknoloji Yığını

- **Monorepo Yönetimi:** pnpm Workspaces
- **Akıllı Kontratlar (Contracts):** Solana, Rust, Anchor Framework
- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Frontend:** Vite, React, TypeScript, Redux Toolkit
- **Veritabanı & Cache:** PostgreSQL, Redis
- **Altyapı & Konteynerleştirme:** Docker, Docker Compose

## Geliştirme Ortamını Kurma

### Gereksinimler
- Node.js (v20+)
- pnpm (v8+)
- Rust (stable)
- Solana CLI
- Anchor CLI (v0.30+)
- Docker & Docker Compose

### Kurulum Adımları

1.  **Bağımlılıkları Yükleyin:**
    `pnpm` workspace kullandığımız için, tüm paketlerin bağımlılıklarını kök dizinden tek komutla yükleyebilirsiniz.
    `pnpm i`

2.  **Geliştirme Ortamını Hazırlayın:**
    Gerekli `.env` dosyalarını oluşturmak için aşağıdaki script'i çalıştırın.
    `pnpm run setup`

3.  **Projeyi Çalıştırın:**
    `pnpm dev`
