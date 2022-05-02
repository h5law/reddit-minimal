import { useState } from 'react';

import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from 'react-icons/ti';

import normaliseNumber from '../../utils/normaliseNumber.js';
import timeDifference from '../../utils/timeDifference.js';

import './Post.css';

const Post = ({ post }) => {
  const [vote, setVote] = useState('');

  const calculateAge = () => {
    const current = new Date().getTime();
    const previous = new Date(post.created_utc).getTime() * 1000;
    return timeDifference(current, previous);
  };

  const setBackgroundImage = () => {
    return {
      width: "100%",
      height: "100%",
      backgroundImage: "url(" + (post.url !== '' ? post.url : post.thumbnail) + ")",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };
  };

  const handleVote = (e) => {
    if (vote === e.currentTarget.value) {
      setVote('');
    } else {
      setVote(e.currentTarget.value)
    }
  };

  return (
    <article className="post-container" key={post.id}>
      <div className="post-votes-container">
        <button
          className="arrow-button"
          value="up"
          onClick={handleVote}
        >
          {vote === "up"
            ? <TiArrowUpThick className="upvote" />
            : <TiArrowUpOutline className="upvote" />
          }
        </button>
        <div className="post-votes-value">
          {normaliseNumber(post.ups)}
        </div>
        <button
          className="arrow-button"
          value="down"
          onClick={handleVote}
        >
          {vote === "down"
            ? <TiArrowDownThick className="downvote" />
            : <TiArrowDownOutline className="downvote" />
          }
        </button>
      </div>
      <div className="post-title">
        {post.title}
      </div>
      <div className="post-preview">
        <div className="post-preview-box"
             style={setBackgroundImage()}
        ></div>
      </div>
      <div className="post-metadata">
        <div className="author-box">
          <p>Posted by: <span>{post.author}</span></p>
        </div>
        <div className="created-box">
          {calculateAge()}
        </div>
        <div className="comment-wrapper">
          <TiMessage className="comment" />
          <div className="comment-amount">
            {normaliseNumber(post.num_comments)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
