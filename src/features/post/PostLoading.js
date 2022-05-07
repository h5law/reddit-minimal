import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from 'react-icons/ti';

import './Post.css';

const PostLoading = () => {
  return (
    <article className="post-container">
      <div className="post-votes-container">
        <TiArrowUpOutline className="upvote" />
        <div className="post-votes-value-loading">
          <div className="skeleton">
            <div className="skeleton-indicator" />
          </div>
        </div>
        <TiArrowDownOutline className="downvote" />
      </div>
      <div className="post-title-loading">
        <div className="title-loading-box">
          <div className="skeleton">
            <div className="skeleton-indicator" />
          </div>
        </div>
      </div>
      <div className="post-preview-loading">
        <div className="preview-loading-box">
          <div className="skeleton">
            <div className="skeleton-indicator" />
          </div>
        </div>
      </div>
      <div className="post-metadata-loading">
        <div className="author-loading-box">
          <div className="skeleton">
            <div className="skeleton-indicator" />
          </div>
        </div>
        <div className="created-loading-box">
          <div className="skeleton">
            <div className="skeleton-indicator" />
          </div>
        </div>
        <TiMessage className="comment" />
        <div className="comment-amount-loading">
          <div className="skeleton">
            <div className="skeleton-indicator" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostLoading;
