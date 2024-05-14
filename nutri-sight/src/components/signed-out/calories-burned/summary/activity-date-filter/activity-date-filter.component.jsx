import Button from "../../../../shared/button/button.component"
import FormInput from "../../../../shared/form-input/form-input.component"
import "./activity-date-filter.styles.scss"

import { useState, useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context"

const defaultFormFields = {
  activity: "",
  dateTracked: "",
  durationMinutes: ""
}

const ActivityDateFilter = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { filterActivityDates, clearActivityDatesFilter } = useContext(CaloriesBurnedContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formFields.activity === "" && formFields.dateTracked === "" &&
      !formFields.activity && !formFields.dateTracked &&
      !formFields.durationMinutes && !formFields.durationMinutes) {
        console.log("please fill out all info")
        return
    }
     
    filterActivityDates(formFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleClearFilter = (event) => {
    event.preventDefault()

    resetFormFields()
    clearActivityDatesFilter()
  }

  return (
    <div className="activity-date-filter-container">
      <form onSubmit={ handleSubmit }>
        <h4>Filter activities</h4>
        <FormInput type="date" onChange={ handleChange }
                    name="dateTracked" value={ formFields.dateTracked }></FormInput>
        
        <FormInput label="Activity" type="text" onChange={ handleChange }
                            name="activity" value={ formFields.activity }></FormInput>

        <FormInput label="Duration (minutes)" type="text" onChange={ handleChange }
                    name="durationMinutes" value={ formFields.durationMinutes }></FormInput>

        <div className="buttons-container">
          <Button type="submit">Filter</Button>
          <Button type="button" onClick={ handleClearFilter }>Clear</Button>
        </div>
      </form>
    </div>
  )
}

export default ActivityDateFilter