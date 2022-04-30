import { FaReddit } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <FaReddit className="reddit-logo" />
        <p>Reddit<span>Minimal</span></p>
      </div>
    </header>
  );
};

export default Header;
