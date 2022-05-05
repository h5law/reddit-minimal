# Reddit Minimal

This is a minimal reddit client, created using React and Redux. It uses the
reddit JSON API to fetch posts and allows for the search of reddit as a whole,
changing subreddit (by searching 'r/[subreddit]') and filtering posts by term.

## TODO

 - Add detailed view for individual posts (react-router-dom)
 - Add functionality to view comments
 - Add loading animations to skeleton post (react-loading-skeleton)
 - Improve UI design
 - Make thumbnails fit properly ~~and add detail to posts without images~~
 - Make site work across mobile and range of browsers

## Dependencies

See `package-lock.json` for more details
 - @reduxjs/toolkit: ^1.8.1
 - react: ^18.0.0
 - react-dom: ^18.0.0
 - react-redux: ^8.0.1
 - react-icons: ^4.3.1

## Install

To install and run this app locally simply clone the repo:
```
$ git clone https://github.com/h5law/reddit-minimal.git
```

Then run:
```
$ cd reddit-minimal
$ npm install
$ npm start
```

## License

[BSD-3](https://choosealicense.com/licenses/bsd-3-clause/)
