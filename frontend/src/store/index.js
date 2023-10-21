// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import recordsReducer from './productivityRecords';

const store = configureStore({
  reducer: {
    auth: authReducer,
    productivity: recordsReducer,
  },
});

export default store;
