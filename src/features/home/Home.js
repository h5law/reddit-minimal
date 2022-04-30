import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPosts,
  selectPosts
} from '../../store/redditSlice.js';

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { posts, error, isLoading, subreddit} = reddit;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  return (
    <div className="home-container">
    </div>
  );
};

export default Home;
