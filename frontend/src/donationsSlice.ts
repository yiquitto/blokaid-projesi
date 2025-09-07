import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle',
};

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {},
});

export default donationsSlice.reducer;