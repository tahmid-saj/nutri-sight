import React from "react";

import "./navigation.styles.scss";

import Bookmarks from "../bookmarks/bookmarks.component";

const Navigation = () => {
  return (
    <nav className="navigation-container">
      <ul className="nav-list-container">
        <Bookmarks></Bookmarks>

      </ul>
    </nav>
  )
};

export default Navigation;

