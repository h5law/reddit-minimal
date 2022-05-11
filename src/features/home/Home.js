import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  useGetSubredditPostsQuery,
  useGetSearchTermPostsQuery
} from '../../api/reddit.js';
import { setSubreddit } from '../../store/redditSlice.js';

import FilterBar from '../search/FilterBar.js';
import ErrorPage from '../../components/error/ErrorPage.js';
import Post from '../post/Post.js';
import PostLoading from '../post/PostLoading.js';

import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { subreddit: paramSub } = useParams();
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
    if (paramSub) {
      dispatch(setSubreddit(`r/${paramSub}`));
    }
    if (showSearchResults) {
      setPosts(stData);
      setLoading(stIsLoading);
      setError(stError);
    } else {
      if (filterTerm !== '') {
        setPosts(posts.filter((post) =>
          post.title.toLowerCase().includes(filterTerm.toLowerCase())));
      } else {
        setPosts(srData);
        setLoading(srIsLoading);
        setError(srError);
      }
    }
  }, [
        dispatch,
        paramSub,
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
      return (
        <>
          <PostLoading />
          <PostLoading />
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </>
      );
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
