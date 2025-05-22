import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Product Reviews
        </Link>
      </div>
    </header>
  );
};

export default Header;
