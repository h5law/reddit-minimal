import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FaSearch } from 'react-icons/fa';

import { setSearchTerm } from '../../store/redditSlice.js';

import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(term));
  };

  const handleChange = ({ target }) => {
    setTerm(target.value);
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
        onChange={handleChange}
        placeholder="Filter Posts"
      />
      <button className="search-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
