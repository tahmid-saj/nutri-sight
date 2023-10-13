import { useState } from "react";

import "./search.styles.scss";

import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

const defaultFormFields = {
  searchedRecipe: ""
};

const Search = ({ displayRecipeViewHandler, updateSearchResults }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { searchedRecipe } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formFields.searchedRecipe);
    setFormFields(defaultFormFields);

    const recipesSearched = await updateSearchResults(formFields.searchedRecipe);
    await displayRecipeViewHandler(formFields.searchedRecipe, recipesSearched);
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
                onChange={ handleChange } value={ searchedRecipe }></FormInput>

      <div className="search-button-container">
        <Button buttonType="regularButton" type="submit">Search</Button>
      </div>
    </form>
  );
};

export default Search;
