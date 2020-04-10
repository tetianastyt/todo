//Core
import React from 'react';
//Style
import './Header.css';

function Header() {
  return (
    <div className="header">
        <span className="colorBlue"> React </span> Todo List
        <h1>Click on task to toggle complete</h1>
    </div>
  );
}

export default Header;
