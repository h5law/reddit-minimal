import { configureStore } from '@reduxjs/toolkit';

import redditSlice from './redditSlice.js';

const store = configureStore({
  reducer: {
    reddit: redditSlice,
  }
});

export default store;
