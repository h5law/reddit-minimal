const REDDIT = 'https://www.reddit.com/';

export const getSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(`${REDDIT}${subreddit}.json`);
    const jsonResponse = await response.json();
    return jsonResponse.data.children.map((post) => post.data);
  } catch (e) {
    console.log(e.message);
    // throw so redditSlice can catch
    throw(e);
  }
};

export const getSearchTermPosts = async (searchTerm) => {
  try {
    const query = searchTerm.replace(/ /gi, '%20');
    const response = await fetch(`${REDDIT}search.json?q=${query}`);
    const jsonResponse = await response.json();
    return jsonResponse.data.children.map((post) => post.data);
  } catch (e) {
    console.log(e.message);
    // throw so redditSlice can catch
    throw(e);
  }
};
