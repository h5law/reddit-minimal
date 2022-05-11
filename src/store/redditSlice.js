import { createSlice } from '@reduxjs/toolkit';

const redditSlice = createSlice({
  name: 'redditSlice',
  initialState: {
    showSearchResults: false,
    subreddit: 'r/pics',
    searchTerm: '',
    filterTerm: '',
  },
  reducers: {
    setShowSearchResults: (state, action) => {
      state.showSearchResults = action.payload;
    },
    setSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
    setSearchTerm: (state, action) => {
      if (action.payload.match(/^r\/.*$/) !== null) {
        state.showSearchResults = false;
        state.searchTerm = '';
        state.subreddit = action.payload;
      } else if (action.payload === '') {
        state.showSearchResults = false;
        state.searchTerm = '';
        state.subreddit = 'r/pics';
      } else {
        state.searchTerm = action.payload.replace(/ /gi, '%20');
        state.showSearchResults = true;
      }
      state.filterTerm = '';
    },
    setFilterTerm: (state, action) => {
      state.filterTerm = action.payload;
    },
  },
});

export const selectShowSearchResults = (state) => state.reddit.showSearchResults;
export const selectSubreddit = (state) => state.reddit.subreddit;
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectFilterTerm = (state) => state.reddit.filterTerm;

export const {
  setShowSearchResults,
  setSubreddit,
  setSearchTerm,
  setFilterTerm
} = redditSlice.actions;

export default redditSlice.reducer;
