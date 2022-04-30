const REDDIT = 'https://www.reddit.com/';

export const getSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(`${REDDIT}${subreddit}.json`);
    const jsonResponse = await response.json();
    return jsonResponse.data.children.map((post) => post.data);
  } catch (e) {
    console.log(e.message)
  }
};
