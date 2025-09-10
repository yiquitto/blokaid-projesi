import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as packageService from '../../services/packageService';

// Paket ve geçmişinin veri yapısını tanımlıyoruz.
export interface PackageHistory {
  id: number;
  status: string;
  timestamp: string;
}

export interface PackageData {
  id: number;
  packageId: string;
  contentHash: string;
  status: string;
  history: PackageHistory[];
}

interface PackagesState {
  currentPackage: PackageData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PackagesState = {
  currentPackage: null,
  isLoading: false,
  error: null,
};

export const fetchPackageById = createAsyncThunk(
  'packages/fetchById',
  async (packageId: string, { rejectWithValue }) => {
    try {
      const data = await packageService.getPackageById(packageId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Paket bulunamadı.');
    }
  }
);

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    clearCurrentPackage: (state) => {
      state.currentPackage = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackageById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentPackage = null;
      })
      .addCase(fetchPackageById.fulfilled, (state, action: PayloadAction<PackageData>) => {
        state.isLoading = false;
        state.currentPackage = action.payload;
      })
      .addCase(fetchPackageById.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentPackage } = packagesSlice.actions;
export default packagesSlice.reducer;