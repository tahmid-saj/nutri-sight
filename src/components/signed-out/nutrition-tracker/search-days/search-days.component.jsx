import { useContext, useState } from "react";

import "./search-days.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import ConsumptionInfo from "../consumption-info/consumption-info.component";

// import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";
import { useDispatch, useSelector } from "react-redux"
import { selectNutritionTrackedDays } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";
import { getDayTracked } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action";

const defaultFormFields = {
  dateTracked: ""
};

const SearchDays = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [searchedClicked, setSearchClicked] = useState(false)

  // const { getDayTracked } = useContext(NutritionTrackerContext)
  const dispatch = useDispatch()
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    setSearchClicked(true)
    event.preventDefault();

    
    // resetFormFields();
    dispatch(getDayTracked(nutritionTrackedDays, formFields.dateTracked))
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    

    setFormFields({ [name]: value })
  };

  return (
    <div className="search-days-nutrition-tracker-container">
      <div className="search-days-container">
        <div className="search-days-nutrition-tracker-separator-container">
          <hr className="rounded"/>
        </div>
        <h4>Search Days Tracked</h4>

        <form onSubmit={ handleSubmit }>
          <FormInput type="date" required name="dateTracked" value={ formFields.dateTracked } 
                      onChange={ handleChange }></FormInput>

          <div className="buttons-container">
            <Button buttonType="regular-button" type="submit">Search Date</Button>
          </div>
        </form>
      </div>

      {
        formFields !== defaultFormFields && searchedClicked &&
        <ConsumptionInfo></ConsumptionInfo> 
      }
    </div>
  );
};

export default SearchDays;