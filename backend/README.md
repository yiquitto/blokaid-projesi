# Backend

Bu paket, Blokaid projesinin Node.js, Express, TypeScript ve Prisma ile geliştirilmiş backend sunucusunu içerir.

## Komutlar

- `pnpm dev`: Geliştirme sunucusunu `ts-node-dev` ile başlatır. Dosya değişikliklerinde otomatik olarak yeniden başlar.
- `pnpm build`: TypeScript kodunu `dist` klasörüne JavaScript olarak derler.
- `pnpm start`: Derlenmiş JavaScript kodunu (`dist/index.js`) çalıştırır. Production ortamı için kullanılır.
- `pnpm prisma:migrate`: Prisma migration'larını veritabanına uygular.
- `pnpm prisma:generate`: Prisma Client'ı şemaya göre günceller.

## End-to-End (E2E) Test

Projenin ana akışını test etmek için bir E2E script'i bulunmaktadır. Bu script, backend sunucusunun çalışır durumda olmasını gerektirir.

### Gereksinimler
- `jq`: Script, JSON yanıtlarını işlemek için `jq` aracını kullanır. (`sudo apt-get install jq` veya `brew install jq` ile kurabilirsiniz).
- **Test Kullanıcısı**: Script'in çalışabilmesi için veritabanında `email: test@blokaid.io`, `password: password123` bilgilerine sahip bir kullanıcı olmalıdır.

### Çalıştırma

Projenin kök dizinindeyken aşağıdaki komutu çalıştırın:
```bash
bash ./scripts/e2e-demo.sh
```
