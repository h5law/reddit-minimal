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
    loading: false,
    subreddit: 'r/pics',
    searchTerm: '',
    filterTerm: '',
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    startGetPosts: (state) => {
      state.error = false;
      state.loading = true;
    },
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    getPostsFailed: (state) => {
      state.loading = false;
      state.error = true;
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

export const searchReddit = (searchTerm) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getSearchTermPosts(searchTerm);
    dispatch(getPostsSuccess(posts));
  } catch (e) {
    dispatch(getPostsFailed());
  }
};

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
