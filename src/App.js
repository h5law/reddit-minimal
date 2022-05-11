import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './features/header/Header.js';
import Home from './features/home/Home.js';
import Detailed from './features/detailed/Detailed.js';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/r/:subreddit/comments/:username/:title"
                 element={<Detailed />} />
          <Route path="/r/:subreddit" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element="" />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
