import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import DonatePage from './pages/DonatePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrackPackagePage from './pages/TrackPackagePage';
import ScanPage from './pages/ScanPage';
import MyDonationsPage from './pages/MyDonationsPage';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/my-donations" element={<MyDonationsPage />} />
          <Route path="/track/:packageId" element={<TrackPackagePage />} />
          <Route path="/scan" element={<ScanPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
