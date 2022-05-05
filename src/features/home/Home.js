import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  useGetSubredditPostsQuery,
  useGetSearchTermPostsQuery
} from '../../api/reddit.js';

import FilterBar from '../search/FilterBar.js';
import ErrorPage from '../../components/error/ErrorPage.js';
import Post from '../post/Post.js';
import PostLoading from '../post/PostLoading.js';

import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reddit = useSelector((state) => state.reddit);
  const {
    showSearchResults,
    subreddit,
    searchTerm,
    filterTerm
  } = reddit;

  const {
    data: srData,
    error: srError,
    isLoading: srIsLoading
  } = useGetSubredditPostsQuery(subreddit);
  const {
    data: stData,
    error: stError,
    isLoading: stIsLoading
  } = useGetSearchTermPostsQuery(searchTerm);

  useEffect(() => {
    if (showSearchResults) {
      setPosts(stData);
      setLoading(stIsLoading);
      setError(stError);
    } else {
      if (filterTerm !== '') {
        setPosts(posts.filter((post) =>
          post.title.toLowerCase().includes(filterTerm)));
      } else {
        setPosts(srData);
        setLoading(srIsLoading);
        setError(srError);
      }
    }
  }, [
        showSearchResults,
        posts,
        subreddit,
        searchTerm,
        filterTerm,
        srData, srError, srIsLoading,
        stData, stError, stIsLoading
     ]);

  const renderPost = () => {
    if (loading) {
      return <PostLoading />;
    } else if (error) {
      return <ErrorPage resource={subreddit} />;
    } else {
      return posts.map(post => <Post post={post} key={post.id} />);
    }
  };

  return (
    <div className="home-container">
      <FilterBar />
      {renderPost()}
    </div>
  );
};

export default Home;
