import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { redditApi } from '../api/reddit.js';
import redditSlice from './redditSlice.js';

const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,
    reddit: redditSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redditApi.middleware),
});

setupListeners(store.dispatch);

export default store;
