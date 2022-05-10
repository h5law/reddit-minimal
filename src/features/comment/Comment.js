import { useState } from 'react';

import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from 'react-icons/ti';

import normaliseNumber from '../../utils/normaliseNumber.js';
import timeDifference from '../../utils/timeDifference.js';

import './Comment.css';

const Comment = ({ comment }) => {
  const [vote, setVote] = useState('');
  const handleVote = (e) => {
    if (vote === e.currentTarget.value) {
      setVote('');
    } else {
      setVote(e.currentTarget.value)
    }
  };

  const calculateAge = (timestamp) => {
    const current = new Date().getTime();
    const previous = new Date(timestamp).getTime() * 1000;
    return timeDifference(current, previous);
  };

  return (
    <li className="comment-container">
      <div className="comment-body">
        {comment.body}
      </div>
      <div className="comment-metadata">
        <div className="comment-votes">
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
          <div className="comment-votes-value">
            {normaliseNumber(comment.ups)}
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
        <div className="comment-details">
          <div className="comment-author">
            Posted By: <span>{comment.author}</span>
          </div>
          <div className="comment-created">
            {comment.created_utc && calculateAge(comment.created_utc)}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Comment;
