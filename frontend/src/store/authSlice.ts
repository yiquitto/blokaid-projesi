import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Sayfa koruması için yüklenme durumu
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  // Uygulama ilk açıldığında token'ı kontrol etme ihtimaline karşı
  // başlangıçta true olması, korumalı sayfalarda anlık yanıp sönmeyi engeller.
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    // Demo için kullanıcı çıkış fonksiyonu
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      // İsterseniz localStorage'daki token'ı da burada temizleyebilirsiniz.
      // localStorage.removeItem('token');
    },
  },
});

export const { setToken, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;