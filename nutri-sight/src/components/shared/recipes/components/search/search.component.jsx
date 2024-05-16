import { useState, useContext } from "react";

import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";
import { ButtonsContainer } from "../../../button/button.styles";

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
    <form onSubmit={ handleSubmit }>
      <FormInput label="Search recipes" type="text" required name="searchedRecipe"
                onChange={ handleChange } value={ formFields.searchedRecipe }></FormInput>

      <ButtonsContainer>
        <Button buttonType="regular-button" type="submit">Search</Button>
      </ButtonsContainer>
    </form>
  );
};

export default Search;
