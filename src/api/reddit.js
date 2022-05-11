import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mapJson = (jsonObject) => {
  return jsonObject.data.children.map((post) => post.data);
};

const extractPostDetails = (array) => {
  const postInfo = array[0].data.children[0].data;
  // filter for subreddit_id to remove the count entry
  const comments = array[1].data.children.map((comment) => comment.data)
                   .filter(comment => comment.subreddit_id);
  return {
    post: postInfo,
    comments
  };
};

export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/' }),
  endpoints: (builder) => ({
    getSubredditPosts: builder.query({
      query: (subreddit) => `${subreddit}.json?limit=75`,
      transformResponse: (response) => mapJson(response),
    }),
    getSearchTermPosts: builder.query({
      query: (searchTerm) => `search.json?q=${searchTerm.replace(/ /gi, '%20')}&limit=100`,
      transformResponse: (response) => mapJson(response),
    }),
    getPostDetails: builder.query({
      query: ({ subreddit, username, title }) =>
        `r/${subreddit}/comments/${username}/${title}.json`,
      transformResponse: (response) => extractPostDetails(response),
    }),
  }),
});

export const {
  useGetSubredditPostsQuery,
  useGetSearchTermPostsQuery,
  useGetPostDetailsQuery
} = redditApi;
