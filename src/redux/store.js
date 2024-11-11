import { configureStore } from '@reduxjs/toolkit';
import songReducer from '../redux/songSlice';

const store = configureStore({
  reducer: {
    song: songReducer,
  },
});

export default store;
