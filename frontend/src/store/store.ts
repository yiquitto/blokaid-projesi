import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import donationsReducer from './slices/donationsSlice';
import packagesReducer from './slices/packagesSlice';
import walletReducer from './slices/walletSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    donations: donationsReducer,
    packages: packagesReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
