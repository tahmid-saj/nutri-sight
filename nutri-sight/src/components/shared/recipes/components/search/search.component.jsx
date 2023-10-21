import { useState, useContext } from "react";

import "./search.styles.scss";

import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";

const defaultFormFields = {
  searchedRecipe: ""
};

const Search = () => {
  const { displaySearchedRecipes } = useContext(RecipesContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formFields.searchedRecipe);

    displaySearchedRecipes(formFields.searchedRecipe);

    resetFormFields();
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormFields({ [name]: value })

    console.log(formFields.searchedRecipe);
  };

  return (
    <form onSubmit={ handleSubmit } className="search-recipe-container">
      <FormInput label="Search recipes" type="text" required name="searchedRecipe"
                onChange={ handleChange } value={ formFields.searchedRecipe }></FormInput>

      <div className="search-button-container">
        <Button buttonType="regularButton" type="submit">Search</Button>
      </div>
    </form>
  );
};

export default Search;
