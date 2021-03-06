import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import { setSearchTerm } from '../../store/redditSlice.js';

import './SearchBar.css';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [width, setWidth] = useState('34px');
  const [color, setColor] = useState('white');
  const [opacity, setOpacity] = useState('0');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(term));
    navigate('/');
  };

  const toggleInput = () => {
    if (width === '34px') {
      setWidth('200px');
      setColor('black');
      setOpacity('1');
    } else {
      setWidth('34px');
      setColor('white');
      setOpacity('0');
    }
  };

  return (
    <form
      className="search-bar-form"
      onSubmit={handleSubmit}
    >
      <input
        ref={(input) => input && input.focus()}
        className="search-bar"
        style={{ width: width, color: color, opacity: opacity }}
        type="text"
        value={term}
        onChange={(e) => setTerm(e.currentTarget.value)}
        placeholder="Search Reddit"
      />
      <FaSearch className="search-button" onClick={toggleInput} />
    </form>
  );
};

export default SearchBar;
