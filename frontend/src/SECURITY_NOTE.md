# Blokaid - Güvenlik ve KVKK Notları

Bu belge, Blokaid platformunun güvenlik ve kişisel verilerin korunması yaklaşımlarını özetlemektedir.

## Veri Sınıflandırması ve Depolama

Veriler iki ana kategoriye ayrılmıştır:

1.  **Off-Chain Veriler (Hassas ve Kişisel):**
    - **Veriler:** Kullanıcı adı, e-posta, şifre (hash'lenmiş), profil bilgileri.
    - **Depolama:** Bu veriler, erişim kontrollü ve güvenli bir PostgreSQL veritabanında saklanır.
    - **KVKK Uyumu:** Kişisel veriler, blok zincirine **asla** yazılmaz. Bu, veri silme ve anonimleştirme gibi yasal hakların uygulanabilmesini sağlar. Veritabanı erişimi sıkı bir şekilde sınırlandırılmıştır.

2.  **On-Chain Veriler (Genel ve Şeffaf):**
    - **Veriler:** Cüzdan adresleri, işlem imzaları, paket durumları, zaman damgaları.
    - **Depolama:** Bu veriler, Solana blok zincirinin halka açık kayıt defterine yazılır.
    - **Güvenlik:** Bu veriler doğası gereği şeffaftır ve platformun güvenilirliğinin temelini oluşturur. Kişisel kimlik bilgileriyle doğrudan ilişkilendirilemezler.

## Güvenlik Önlemleri

- **API Güvenliği:** Tüm API endpoint'leri, rol tabanlı yetkilendirme kontrolleri içeren JWT (JSON Web Token) ile korunmaktadır.
- **Şifreleme:** Kullanıcı şifreleri, `bcrypt` algoritması kullanılarak tek yönlü olarak hash'lenir. Veritabanı ve istemci arasındaki iletişim SSL/TLS ile şifrelenir.
- **Akıllı Kontrat Güvenliği:** Anchor Framework'ün yerleşik güvenlik özellikleri kullanılır. Kontratlar, yetkisiz para çekimini ve durum manipülasyonunu önlemek için sıkı kontrollere sahiptir.