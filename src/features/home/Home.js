import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPosts,
  selectFilteredPosts,
  searchReddit
} from '../../store/redditSlice.js';

import FilterBar from '../search/FilterBar.js';
import ErrorPage from '../../components/error/ErrorPage.js';
import Post from '../post/Post.js';
import PostLoading from '../post/PostLoading.js';

import './Home.css';

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { error, loading, subreddit, searchTerm } = reddit;
  const dispatch = useDispatch();
  const filteredPosts = useSelector(selectFilteredPosts);

  useEffect(() => {
    if (searchTerm === '') {
      dispatch(fetchPosts(subreddit));
    } else {
      dispatch(searchReddit(searchTerm));
    }
  }, [dispatch, searchTerm, subreddit]);

  const renderPost = () => {
    if (loading) {
      return <PostLoading />;
    } else if (error) {
      return <ErrorPage resource={subreddit} />;
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
