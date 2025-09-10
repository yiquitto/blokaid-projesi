import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  // Kimlik doğrulama durumu kontrol edilirken bir yükleme ekranı göstermek iyi bir pratiktir.
  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><p>Yükleniyor...</p></div>;
  }

  // Eğer kullanıcı giriş yapmamışsa, onu giriş sayfasına yönlendir.
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Kullanıcı giriş yapmışsa, istenen sayfayı (child route) göster.
  return <Outlet />;
};

export default ProtectedRoute;