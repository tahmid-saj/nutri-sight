import Button from "../../../shared/button/button.component";
import FormInput from "../../../shared/form-input/form-input.component";
import "./nutrition-tracker-filter.styles.scss"

import { useState, useContext } from "react"
import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";

const defaultFormFields = {
  filterStartDate: "",
  filterEndDate: ""
}

const NutritionTrackerFilter = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { filterDayTracked, clearDayTrackedFilter } = useContext(NutritionTrackerContext)
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formFields.filterStartDate === "" && formFields.filterEndDate === "" && !formFields.filterStartDate && !formFields.filterEndDate) {
      console.log("please fill out all info")
      return
    }
    
    filterDayTracked(formFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleClearFilter = (event) => {
    event.preventDefault()

    resetFormFields()
    clearDayTrackedFilter()
  }

  return (
    <div className="nutrition-tracker-filter-container">
      <form onSubmit={ handleSubmit }>
        <h4>Filter by date range</h4>
        <FormInput type="date" onChange={ handleChange }
                    name="filterStartDate" value={ formFields.filterStartDate }></FormInput>
        
        <FormInput type="date" onChange={ handleChange }
                    name="filterEndDate" value={ formFields.filterEndDate }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Filter</Button>
          <Button type="button" onClick={ handleClearFilter }>Clear</Button>
        </div>
      </form>
    </div>
  )
}

export default NutritionTrackerFilter