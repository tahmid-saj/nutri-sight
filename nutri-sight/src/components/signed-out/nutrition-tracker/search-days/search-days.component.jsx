import { useState } from "react";

import "./search-days.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import ConsumptionInfo from "../consumption-info/consumption-info.component";

const defaultFormFields = {
  dateTracked: ""
};

const SearchDays = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [searchedDay, setSearchedDay] = useState(false);
  const { dateTracked } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchedDay(true);
    console.log(dateTracked);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value);

    setFormFields({ [name]: value })
    setSearchedDay(false);
  };

  return (
    <div className="search-days-nutrition-tracker-container">
      <div className="search-days-container">
        <h2>Search days tracked</h2>

        <form onSubmit={ handleSubmit }>
          <FormInput type="date" required name="dateTracked" value={ dateTracked } onChange={ handleChange }></FormInput>

          <div className="buttons-container">
            <Button buttonType="regularButton" type="submit">Search Date</Button>
          </div>

        </form>
      </div>

      { dateTracked && searchedDay && <ConsumptionInfo searchedDay={ dateTracked }></ConsumptionInfo> }
    </div>
  );
};

export default SearchDays;