import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetPostDetailsQuery } from '../../api/reddit.js';

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

  return (
    <article className="detailed-wrapper">
      {console.log(data)}
    </article>
  );
};

export default Detailed;
