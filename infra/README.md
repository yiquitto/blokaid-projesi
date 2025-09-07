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

Proje yığınını yönetmek için kök dizindeki `scripts/dev.sh` script'ini kullanın:

- **Tüm servisleri başlatmak için:** `bash ./scripts/dev.sh up`
- **Tüm servisleri durdurmak için:** `bash ./scripts/dev.sh down`
- **Tüm servislerin loglarını izlemek için:** `bash ./scripts/dev.sh logs`
