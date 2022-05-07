import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetPostDetailsQuery } from '../../api/reddit.js';

import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from 'react-icons/ti';

import normaliseNumber from '../../utils/normaliseNumber.js';
import timeDifference from '../../utils/timeDifference.js';

import './Detailed.css';

const Detailed = () => {
  const navigate = useNavigate();
  const { subreddit, username, title } = useParams();

  /* getPostDetailsQuery API call
   * response = { post: {post data}, comments: [comments objects]}
   */
  const {
    data,
    error,
    isLoading
  } = useGetPostDetailsQuery({
        subreddit,
        username,
        title
      });

  const calculateAge = (timestamp) => {
    const current = new Date().getTime();
    const previous = new Date(timestamp).getTime() * 1000;
    return timeDifference(current, previous);
  };

  const [vote, setVote] = useState('');
  const handleVote = (e) => {
    if (vote === e.currentTarget.value) {
      setVote('');
    } else {
      setVote(e.currentTarget.value)
    }
  };

  const displayContent = () => {
    if (data.post.url.endsWith('.jpg') || data.post.url.endsWith('.gif')) {
      return <img src={data.post.url} width="500px" />;
    } else if (data.post.media_embed.content) {
      let embedString = data.post.media_embed.content
                        .replace(/&lt;/gi, '<')
                        .replace(/&gt;/gi, '>');
      embedString = embedString
                    .replace(/width="\d+"/, 'width="500"')
                    .replace(/height="\d+"/, 'height="281"')
      return (
        <div
          className="embed_media"
          dangerouslySetInnerHTML={{__html: embedString}}>
        </div>
      );
    } else if (data.post.secure_media && data.post.secure_media.reddit_video.fallback_url) {
      return (
        <embed
          type="video/mp4"
          src={data.post.secure_media.reddit_video.fallback_url}
          width="500"
          height="281"
        />
      );
    } else {
      return <h1>Deal with this</h1>;
    }
  };

  const renderDetailedPost = () => {
    return (
      <>
      <section className="detailed-post">
        <div className="detailed-top-container">
          <div className="detailed-votes">
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
            <div className="detailed-votes-value">
              {normaliseNumber(data.post.ups)}
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
          <div className="detailed-title">
            {data.post.title}
          </div>
        </div>
        <div className="detailed-post-content">
          <a href={data.post.url} target="_blank">{displayContent()}</a>
        </div>
        <div className="post-metadata">
          <div className="author-box">
            <p>Posted by: <span>{data.post.author}</span></p>
          </div>
          <div className="created-box">
            {calculateAge(data.post.created)}
          </div>
          <div className="comment-wrapper">
            <TiMessage className="comment" />
            <div className="comment-amount">
              {normaliseNumber(data.post.num_comments)}
            </div>
          </div>
        </div>
        <div className="detailed-comments">
        </div>
      </section>
      </>
    );
  };

  return (
    <article className="detailed-wrapper">
      { isLoading
        ? <h1>Loading post...</h1>
        : renderDetailedPost()
      }
    </article>
  );
};

export default Detailed;
