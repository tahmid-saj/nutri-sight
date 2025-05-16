import "./header.styles.tsx";
import { HeaderContainer } from "./header.styles.tsx";

import React from "react";
// import "../recipes.styles.scss";

import Search from "../search/search.component.tsx";
import Navigation from "../navigation/navigation.component.tsx";

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

