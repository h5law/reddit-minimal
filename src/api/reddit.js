import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mapJson = (jsonObject) => {
  return jsonObject.data.children.map((post) => post.data);
};

export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/' }),
  endpoints: (builder) => ({
    getSubredditPosts: builder.query({
      query: (subreddit) => `${subreddit}.json`,
      transformResponse: (response) => mapJson(response),
    }),
    getSearchTermPosts: builder.query({
      query: (searchTerm) => `search.json?q=${searchTerm.replace(/ /gi, '%20')}`,
      transformResponse: (response) => mapJson(response),
    }),
  }),
});

export const {
  useGetSubredditPostsQuery,
  useGetSearchTermPostsQuery
} = redditApi;
