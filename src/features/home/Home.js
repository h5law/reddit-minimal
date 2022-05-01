import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPosts,
  selectFilteredPosts,
  selectPosts,
  searchReddit
} from '../../store/redditSlice.js';

import FilterBar from '../search/FilterBar.js';
import Post from '../post/Post.js';
import PostLoading from '../post/PostLoading.js';

import './Home.css';

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { posts, error, isLoading, subreddit, searchTerm} = reddit;
  const dispatch = useDispatch();
  const filteredPosts = useSelector(selectFilteredPosts);

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  const renderPost = () => {
    if (isLoading) {
      return <PostLoading />;
    } else {
      return filteredPosts.map(post => <Post post={post} key={post.id} />);
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
