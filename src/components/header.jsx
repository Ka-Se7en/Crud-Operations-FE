import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header-style.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">All Students</Link>
          </li>
          <li>
            <Link to="/studentAdd">Add Student</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
