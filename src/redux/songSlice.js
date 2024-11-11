import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  progress: 0,
  isPlaying: false,
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.progress = 0;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setCurrentSong, setProgress, setPlaying } = songSlice.actions;
export default songSlice.reducer;
