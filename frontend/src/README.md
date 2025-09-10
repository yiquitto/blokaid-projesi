# Frontend Klasör Yapısı

Bu proje, "Separation of Concerns" (Sorumlulukların Ayrılması) ilkesine göre düzenlenmiştir. Her klasörün net bir sorumluluğu vardır.

- **/components**: Tekrar kullanılabilir, genel UI bileşenleri.
  - **/common**: Buton, Input gibi çok genel bileşenler.
  - **/layout**: Header, Footer, MainLayout gibi sayfa yerleşim bileşenleri.

- **/hooks**: Özel olarak yazılmış React hook'ları (`useUser`, `useApi` vb.).

- **/pages**: Uygulamanın ana sayfaları. Her bir route (yönlendirme) için bir sayfa bileşeni bulunur (`HomePage`, `DashboardPage` vb.).

- **/routes**: Uygulamanın sayfa yönlendirme (routing) mantığı. Tüm yollar burada tanımlanır.

- **/services**: API istekleri gibi dış servislerle olan tüm iletişim burada yönetilir.

- **/store**: Redux state yönetimi ile ilgili her şey (slices, store yapılandırması vb.).

- **/utils**: Genel yardımcı fonksiyonlar (tarih formatlama, veri doğrulama vb.).