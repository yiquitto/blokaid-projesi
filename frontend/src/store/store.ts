import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Yol düzeltildi
// import donationsReducer from './slices/donationsSlice';
// import packagesReducer from './slices/packagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // donations: donationsReducer,
    // packages: packagesReducer,
    // Diğer slice'lar buraya eklenecek
  },
});

// State ve Dispatch tiplerini tanımlıyoruz.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;