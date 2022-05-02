import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FaSearch } from 'react-icons/fa';

import { setFilterTerm } from '../../store/redditSlice.js';

import './FilterBar.css';

const FilterBar = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilterTerm(term));
    setTerm('');
  };

  return (
    <form
      className="filter-bar-form"
      onSubmit={handleSubmit}
    >
      <input
        className="filter-bar"
        type="text"
        value={term}
        onChange={(e) => setTerm(e.currentTarget.value)}
        placeholder="Filter Posts"
      />
      <button className="filter-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default FilterBar;
