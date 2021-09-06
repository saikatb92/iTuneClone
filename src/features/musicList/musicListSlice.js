/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  albums: [],
  errors: [],
};

const musicListSlice = createSlice({
  name: 'musicList',
  initialState,

  reducers: {
    componentDidMount: () => {

    },

    saveData: (state, action) => {
      state.albums = action.payload;
    },

    setFavorite: (state, action) => {
      const selectedAlbum = state.albums.filter((album) => album.id.attributes['im:id'] === action.payload);
      selectedAlbum[0].isFavorite = !selectedAlbum[0].isFavorite;
    },

    setErrors: (state, action) => {
      state.errors = [];
      state.errors.push(action.payload);
    },
  },
});

export const {
  componentDidMount, saveData, setFavorite, setErrors,
} = musicListSlice.actions;

export const selectors = {
  base: (state) => state.musicList,
};

export default musicListSlice.reducer;
