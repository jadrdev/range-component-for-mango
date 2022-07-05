import React from 'react'
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/exercise1">About</Link>
        <Link to="/exercise2">About</Link>
      </nav>
    </div>
  )
}

export default Menu;
