import React from 'react';
import { Link } from 'gatsby';
import '../styles/global.css';
export default function Navbar() {
  return (
    <>
      <div className="Navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </>
  );
}
