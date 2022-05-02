import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

import { setSearchTerm } from '../../store/redditSlice.js';

import './SearchBar.css';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(term));
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
