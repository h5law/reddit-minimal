import { createSlice } from '@reduxjs/toolkit';

import {
  getSubredditPosts,
  getSearchTermPosts
} from '../api/reddit.js';

const redditSlice = createSlice({
  name: 'redditSlice',
  initialState: {
    posts: [],
    error: false,
    isLoading: false,
    subreddit: 'r/pics',
    searchTerm: '',
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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

export const selectFilteredPosts = (state) => {
  if (state.reddit.searchTerm !== '') {
    return state.reddit.posts.filter((post) => (
      post.title.includes(state.reddit.searchTerm)
    ));
  } else {
    return state.reddit.posts;
  }
};

export const selectPosts = (state) => state.reddit.posts;
export const selectError = (state) => state.reddit.error;
export const selectLoading = (state) => state.reddit.isLoading;
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
