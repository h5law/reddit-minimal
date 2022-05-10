import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPostDetailsQuery } from '../../api/reddit.js';

import Comment from '../comment/Comment.js';
import DetailedLoading from './DetailedLoading.js';
import ErrorPage from '../../components/error/ErrorPage.js';

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

  const isImage = (url) => {
    if (url.endsWith('.jpg')
     || url.endsWith('.jpeg')
     || url.endsWith('.png')
     || url.endsWith('.gif')) {
      return url;
    } else if (url.match(/^.*\.[[jpg][jpeg][png][gif]]?\?.*$/)) {
      return url.replace(/\?.*$/, '');
    } else {
      return '';
    }
  };

  const displayContent = () => {
    if (isImage(data.post.url)) {
      return (
        <a href={data.post.url} target="_blank" rel="noreferrer">
          <img
            alt={data.post.title}
            src={data.post.url}
            width="500px"
          />
        </a>
      );
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
    } else if (data.post.selftext) {
        return (<p dangerouslySetInnerHTML={{__html: data.post.selftext}}></p>);
    } else {
      return <h1>View external content</h1>
    }
  };

  const renderDetailedPost = () => {
    return (
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
          {displayContent()}
        </div>
        <div className="post-metadata">
          <div className="author-box">
            <p>Posted by: <span>{data.post.author}</span></p>
          </div>
          <div className="created-box">
            {calculateAge(data.post.created_utc)}
          </div>
          <div className="comment-wrapper">
            <TiMessage className="comment" />
            <div className="comment-amount">
              {normaliseNumber(data.post.num_comments)}
            </div>
          </div>
        </div>
        <ul className="detailed-comments">
          { (data.comments.length > 0) &&
          data.comments.map(comment => <Comment comment={comment} key={comment.id} />)
          }
        </ul>
      </section>
    );
  };

  const renderPost = () => {
    if (isLoading) {
      return <DetailedLoading />;
    } else if (error) {
      return <ErrorPage resource={`'r/${subreddit}/comments/${username}/${title}'`} />;
    } else {
      return renderDetailedPost();
    }
  };

  return (
    <article className="detailed-wrapper">
      {renderPost()}
    </article>
  );
};

export default Detailed;
