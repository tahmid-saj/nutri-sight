import React from "react";

import "./header.styles.scss";
import "../recipes.styles.scss";

import Search from "../search/search.component";
import Navigation from "../navigation/navigation.component";

const Header = ({ displayRecipeViewHandler, updateSearchResults }) => {
  return (
    <header className="header-container">
      <Search displayRecipeViewHandler={ displayRecipeViewHandler } 
              updateSearchResults={ updateSearchResults }></Search>

      <Navigation></Navigation>
    </header>
  )
};

export default Header;

