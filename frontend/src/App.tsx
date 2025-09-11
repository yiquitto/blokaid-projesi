import React from 'react';
import AppRouter from './routes';
// Footer bileşenini taşıdığınız varsayılan yeni konumdan import edin.
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> bileşeni eklendiğinde buraya dahil edilebilir */}
      <main className="flex-grow">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;