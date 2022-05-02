import { FaReddit } from 'react-icons/fa';

import SearchBar from '../search/SearchBar.js';

import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <FaReddit className="reddit-logo" />
        <p>Reddit<span className="primary-blue">Minimal</span></p>
      </div>
      <div className="search-wrapper">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
