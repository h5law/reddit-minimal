import { createSlice } from '@reduxjs/toolkit';

import { getSubredditPosts } from '../api/reddit.js';

const redditSlice = createSlice({
  name: 'redditSlice',
  initialState: {
    posts: [],
    error: false,
    isLoading: false,
    subreddit: 'r/popular';
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    startGetPosts: (state) => {
      state.error = false;
      state.isLoading = true;
    },
    getPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostsFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    setSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
  },
});

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getSubredditPosts(subreddit);
    dispatch(getPostsSuccess(posts));
  } catch (e) {
    dispatch(getPostsFailed());
  }
};

export const selectPosts = (state) => state.posts;
export const selectError = (state) => state.error;
export const selectLoading = (state) => state.isLoading;
export const selectSubreddit = (state) => state.subreddit;

export const {
  setPosts,
  startGetPosts,
  getPostsSuccess,
  getPostsFailed,
  setSubreddit
} = redditSlice.actions;

export default redditSlice.reducer;
