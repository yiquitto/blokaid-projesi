# Blokaid - Jüri için Sıkça Sorulan Sorular (SSS)

## Teknik Sorular

**1. Neden Solana blok zincirini tercih ettiniz?**
> **Cevap:** Yüksek işlem hızı (TPS), düşük işlem ücretleri (gas fees) ve ölçeklenebilirliği nedeniyle Solana'yı seçtik. Bu, platformumuzdaki her bir durum güncellemesinin (bağış, tarama vb.) maliyet-etkin ve anlık olarak kaydedilmesini sağlıyor.

**2. Verilerin ne kadarı on-chain (blok zincirinde), ne kadarı off-chain (veritabanında) tutuluyor?**
> **Cevap:** Kritik ve şeffaflık gerektiren verileri (paket ID, durum, hash, işlem imzaları) on-chain tutuyoruz. Kullanıcı bilgileri, detaylı açıklamalar gibi daha dinamik ve özel verileri ise off-chain PostgreSQL veritabanımızda yönetiyoruz. Bu hibrit yaklaşım, hem güvenlik hem de esneklik sağlıyor.

**3. Akıllı kontratlarınızın güvenliği nasıl sağlandı?**
> **Cevap:** Anchor Framework'ün sağladığı güvenlik mekanizmalarını (hesap doğrulama, `has_one` gibi kısıtlamalar) kullandık. Ayrıca, yetkisiz erişimi engelleyen `only_owner` gibi kontroller ekledik. Kodumuz, bilinen zafiyetlere (re-entrancy vb.) karşı denetlenmiştir.

**4. NFT'lerin bu sistemdeki rolü tam olarak nedir?**
> **Cevap:** NFT'ler, her bir yardım paketinin dijital, eşsiz ve sahiplenilebilir bir kimliğidir. Bu, paketin yolculuğunu takip etmeyi kolaylaştırır ve bağışçıya, bağışının somut bir çıktısı olduğunu gösteren sembolik bir "teşekkür sertifikası" sunar.

**5. Sistem nasıl ölçeklenecek? Milyonlarca paketi yönetebilir mi?**
> **Cevap:** Evet. Solana'nın saniyede binlerce işlemi kaldırabilme kapasitesi sayesinde on-chain kısım ölçeklenebilir. Off-chain tarafta ise standart backend ölçekleme tekniklerini (load balancing, veritabanı replikasyonu) kullanarak talebi karşılayabiliriz.

**6. Gas ücretlerini kim karşılıyor?**
> **Cevap:** MVP aşamasında, paket kaydı ve durum güncellemesi gibi işlemlerin gas ücretleri, sistemin merkezi bir cüzdanı (Payer Wallet) tarafından karşılanmaktadır. Bu, kullanıcı deneyimini basitleştirir.

**7. Veri gizliliğini nasıl sağlıyorsunuz? (KVKK/GDPR)**
> **Cevap:** Tüm kişisel veriler (isim, e-posta) şifrelenmiş bir veritabanında, yani off-chain'de saklanır. Blok zincirine sadece anonim ve kimlikle ilişkilendirilemeyen veriler (cüzdan adresi, işlem ID'si) yazılır.

**8. Bu projenin bir benzeri var mı? Sizi farklı kılan ne?**
> **Cevap:** Blok zinciri tabanlı yardım platformları mevcut olsa da, bizim farkımız; lojistik sürecini QR kod ve NFT ile entegre ederek fiziksel ve dijital dünya arasında somut bir köprü kurmamız ve bunu son kullanıcı için son derece basit bir arayüzle sunmamızdır.

**9. API güvenliği nasıl sağlanıyor?**
> **Cevap:** API endpoint'lerimiz JWT (JSON Web Tokens) ile korunmaktadır. Kullanıcılar sadece kendi verilerine erişebilir ve yetkileri dahilinde işlem yapabilirler.

**10. Eğer Solana ağı çökerse ne olur?**
> **Cevap:** Solana, yüksek çalışma süresine sahip merkeziyetsiz bir ağdır. Nadir de olsa yaşanabilecek bir yavaşlama veya kesinti durumunda, sistemimiz off-chain verileri kaydetmeye devam eder ve ağ normale döndüğünde on-chain işlemleri senkronize edecek şekilde tasarlanmıştır.