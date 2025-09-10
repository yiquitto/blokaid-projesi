# Altyapı (Infrastructure)

Bu klasör, projenin geliştirme ve production ortamları için gerekli altyapı yapılandırmalarını içerir. `docker-compose.yml` dosyası, projenin tüm servislerini tek bir komutla ayağa kaldırmak için kullanılır.

## Mimarî

Sistem, ana giriş noktası olarak bir Nginx reverse proxy kullanır.
- **Nginx (nginx):** `http://localhost:8080` adresinden gelen tüm istekleri karşılar.
  - `/api/*` yoluna gelen istekleri `backend` servisine yönlendirir.
  - Diğer tüm istekler için derlenmiş olan React frontend uygulamasını sunar.
- **Backend (backend):** API mantığını ve veritabanı/Solana etkileşimlerini yönetir. Dışarıya port açmaz.
- **Veritabanı (postgres):** PostgreSQL veritabanı.
- **Cache (redis):** Redis cache sunucusu.

## Kullanım

Proje yığınını yönetmek için kök dizindeki `pnpm run stack` komutunu kullanın:

  ```bash
  pnpm run stack -- up
  ```
  ```bash
  pnpm run stack -- down
  ```
  ```bash
  pnpm run stack -- logs
  # Belirli bir servisin loglarını izlemek için: pnpm run stack -- logs backend
  ```
