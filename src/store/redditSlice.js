import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getSubredditPosts,
  getSearchTermPosts
} from '../api/reddit.js';

const redditSlice = createSlice({
  name: 'redditSlice',
  initialState: {
    posts: [],
    error: false,
    loading: false,
    subreddit: 'r/pics',
    searchTerm: '',
    filterTerm: '',
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
    setSearchTerm: (state, action) => {
      if (action.payload.match(/^r\/.*$/) !== null) {
        state.searchTerm = '';
        state.subreddit = action.payload;
      } else if (action.payload === '') {
        state.searchTerm = '';
        state.subreddit = 'r/pics';
      } else {
        state.searchTerm = action.payload;
      }
      state.filterTerm = '';
    },
    setFilterTerm: (state, action) => {
      state.filterTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(searchReddit.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(searchReddit.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(searchReddit.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const fetchPosts = createAsyncThunk(
  'redditSlice/fetchPosts',
  async (subreddit, thunkAPI) => {
    const posts = await getSubredditPosts(subreddit);
    return posts;
  }
);

export const searchReddit = createAsyncThunk(
  'redditSlice/searchReddit',
  async (searchTerm, thunkAPI) => {
    const posts = await getSearchTermPosts(searchTerm);
    return posts;
  }
);

export const selectFilteredPosts = (state) => {
  if (state.reddit.error) return [];
  if (state.reddit.filterTerm !== '') {
    return state.reddit.posts.filter((post) => (
      post.title.toLowerCase().includes(state.reddit.filterTerm.toLowerCase())
    ));
  } else {
    return state.reddit.posts;
  }
};

export const selectPosts = (state) => state.reddit.posts;
export const selectError = (state) => state.reddit.error;
export const selectLoading = (state) => state.reddit.loading;
export const selectSubreddit = (state) => state.reddit.subreddit;
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectFilterTerm = (state) => state.reddit.filterTerm;

export const {
  setPosts,
  startGetPosts,
  getPostsSuccess,
  getPostsFailed,
  setSubreddit,
  setSearchTerm,
  setFilterTerm
} = redditSlice.actions;

export default redditSlice.reducer;
