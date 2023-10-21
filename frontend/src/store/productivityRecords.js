// productivityRecords.js
import { createSlice } from '@reduxjs/toolkit';

const productivityRecords = createSlice({
  name: 'records',
  initialState: { records: [] },
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload;
    },
  },
});

export const { setRecords } = productivityRecords.actions;
export default productivityRecords.reducer;
