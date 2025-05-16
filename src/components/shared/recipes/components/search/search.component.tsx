import { useState, useContext, FormEvent, ChangeEvent } from "react";

import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";
import { ButtonsContainer } from "../../../button/button.styles";

type FormFields = {
  searchedRecipe: string
}

const defaultFormFields = {
  searchedRecipe: ""
};

const Search = () => {
  const { displaySearchedRecipes } = useContext(RecipesContext);
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    displaySearchedRecipes(formFields.searchedRecipe);

    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
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
