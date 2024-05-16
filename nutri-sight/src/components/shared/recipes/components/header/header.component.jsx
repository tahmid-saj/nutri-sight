import "./header.styles.jsx";
import { HeaderContainer } from "./header.styles.jsx";

import React from "react";
// import "../recipes.styles.scss";

import Search from "../search/search.component";
import Navigation from "../navigation/navigation.component";

const Header = (
  // { displayRecipeViewHandler, updateSearchResults, handleSearchChange }
  ) => {
  return (
    <HeaderContainer>
      <Search 
              // displayRecipeViewHandler={ displayRecipeViewHandler } 
              // updateSearchResults={ updateSearchResults }
              // handleSearchChange={ handleSearchChange }
              ></Search>

      {/* <Navigation></Navigation> */}
    </HeaderContainer>
  )
};

export default Header;

