import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import './SearchBar.css';

const SearchBar = () => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="search-bar-form"
      onSubmit={handleSubmit}
    >
      <input
        className="search-bar"
        type="text"
        value={term}
        onChange={(e) => setTerm(e.currentTarget.value)}
        placeholder="Search Reddit"
      />
      <button className="search-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
