import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPosts,
  selectFilteredPosts,
  selectPosts
} from '../../store/redditSlice.js';

import SearchBar from '../search/SearchBar.js';
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
  }, [dispatch, searchTerm, subreddit]);

  const renderPost = () => {
    if (isLoading) {
      return <PostLoading />;
    } else {
      return filteredPosts.map(post => <Post post={post} key={post.id} />);
    }
  };

  return (
    <div className="home-container">
      <SearchBar />
      {renderPost()}
    </div>
  );
};

export default Home;
