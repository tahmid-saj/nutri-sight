import { useState } from "react";

import "./search.styles.scss";

import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

const defaultFormFields = {
  searchedRecipe: ""
};

const Search = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { searchedRecipe } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
  };

  return (
    <form className="search-recipe-container">
      <FormInput label="Search recipes" type="text" required name="search"
                onChange={ handleChange } value={ searchedRecipe }></FormInput>

      <div className="search-button-container">
        <Button buttonType="regularButton" type="submit">Search</Button>
      </div>
    </form>
  );
};

export default Search;
