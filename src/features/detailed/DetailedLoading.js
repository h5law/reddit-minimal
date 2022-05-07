import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from 'react-icons/ti';

import './Detailed.css';

const DetailedLoading = () => {
  return (
    <article className="detailed-wrapper">
      <section className="detailed-post">
        <div className="detailed-top-container">
          <div className="detailed-votes">
            <button className="arrow-button">
              <TiArrowUpOutline className="upvote" />
            </button>
            <div className="detailed-votes-value-loading">
              <div className="skeleton">
                <div className="skeleton-indicator" />
              </div>
            </div>
            <button className="arrow-button">
              <TiArrowDownOutline className="downvote" />
            </button>
          </div>
          <div className="detailed-title-loading">
            <div className="skeleton">
              <div className="skeleton-indicator" />
            </div>
          </div>
        </div>
        <div className="detailed-post-content-loading">
          <div className="skeleton">
            <div className="skeleton-indicator" />
          </div>
        </div>
        <div className="post-metadata">
          <div className="author-box-loading">
            <div className="skeleton">
              <div className="skeleton-indicator" />
            </div>
          </div>
          <div className="created-box-loading">
            <div className="skeleton">
              <div className="skeleton-indicator" />
            </div>
          </div>
          <div className="comment-wrapper">
            <TiMessage className="comment" />
            <div className="comment-box-loading">
              <div className="skeleton">
                <div className="skeleton-indicator" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default DetailedLoading;
