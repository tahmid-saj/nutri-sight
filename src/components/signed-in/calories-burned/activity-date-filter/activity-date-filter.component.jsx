import Button from "../../../shared/button/button.component.jsx"
import FormInput from "../../../shared/form-input/form-input.component.jsx"
import "./activity-date-filter.styles.jsx"
import { ActivityDateFilterContainer, FilterButtonsContainer } from "./activity-date-filter.styles.jsx"

import { useState, useContext } from "react"
import { CaloriesBurnedContext } from "../../../../contexts/signed-in/calories-burned/calories-burned.context.js"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"
import { Typography } from "@mui/material"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"

const defaultFormFields = {
  activity: "",
  dateTracked: "",
  durationMinutes: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.filter.width
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
    <ActivityDateFilterContainer>
      <SimplePaper styles={ paperStyles }>
        <form onSubmit={ handleSubmit }>
          <Typography variant="h6">Filter activities</Typography>
          <FormInput type="date" onChange={ handleChange }
                      name="dateTracked" value={ formFields.dateTracked }></FormInput>
          
          <FormInput label="Activity" type="text" onChange={ handleChange }
                              name="activity" value={ formFields.activity }></FormInput>

          <FormInput label="Duration (minutes)" type="text" onChange={ handleChange }
                      name="durationMinutes" value={ formFields.durationMinutes }></FormInput>

          <FilterButtonsContainer>
            <Button type="submit">Filter</Button>
            <Button type="button" onClick={ handleClearFilter }>Clear</Button>
          </FilterButtonsContainer>
        </form>
      </SimplePaper>
    </ActivityDateFilterContainer>
  )
}

export default ActivityDateFilter