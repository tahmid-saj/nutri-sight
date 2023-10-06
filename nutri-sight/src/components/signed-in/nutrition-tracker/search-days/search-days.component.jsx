import { useState } from "react";

import "./search-days.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

const defaultFormFields = {
  dateTracked: ""
};

const SearchDays = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { dateTracked } = formFields;

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
    <div className="search-days-container">
      <h2>Search days tracked</h2>

      <form onSubmit={ handleSubmit }>
        <FormInput type="date" required name="dateTracked" value={ dateTracked }></FormInput>

        <div className="buttons-container">
          <Button buttonType="regularButton" type="submit">Search Date</Button>
        </div>

      </form>
    </div>
  );
};

export default SearchDays;