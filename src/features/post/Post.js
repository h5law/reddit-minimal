import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from 'react-icons/ti';

import timeDifference from '../../utils/timeDifference.js';

import './Post.css';

const Post = ({ post }) => {
  const calculateAge = () => {
    const current = new Date().getTime();
    const previous = new Date(post.created_utc).getTime() * 1000;
    return timeDifference(current, previous);
  };

  const setBackgroundImage = () => {
    return {
      width: "100%",
      height: "100%",
      backgroundImage: "url(" + post.thumbnail + ")",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };
  };

  return (
    <article className="post-container" key={post.id}>
      <div className="post-votes-container">
        <TiArrowUpOutline className="upvote" />
        <div className="post-votes-value">
          {post.ups}
        </div>
        <TiArrowDownOutline className="downvote" />
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
            {post.num_comments}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
