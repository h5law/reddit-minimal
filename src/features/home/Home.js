import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPosts,
  selectPosts
} from '../../store/redditSlice.js';
import Post from '../post/Post.js';
import PostLoading from '../post/PostLoading.js';

import './Home.css';

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { posts, error, isLoading, subreddit} = reddit;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  const renderPost = () => {
    if (isLoading) {
      return <PostLoading />;
    } else {
      return posts.map(post => <Post post={post} key={post.id} />);
    }
  };

  return (
    <div className="home-container">
      {renderPost()}
    </div>
  );
};

export default Home;
