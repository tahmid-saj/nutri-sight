import Button from "../../../../shared/button/button.component"
import "./activity-date-form.styles.jsx"
import { ActivityDateFormContainer } from "./activity-date-form.styles.jsx"
import { useState, useContext } from "react"
import FormInput from "../../../../shared/form-input/form-input.component"

import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context"
import { Typography } from "@mui/material"
import SimplePaper from "../../../../shared/mui/paper/paper.component.jsx"
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.js"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const defaultFormFields = {
  activity: "",
  dateTracked: "",
  weightPounds: "",
  durationMinutes: ""
}

const ActivityDateForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { searchActivity } = useContext(CaloriesBurnedContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await searchActivity(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <ActivityDateFormContainer>
      <SimplePaper styles={ paperStyles }>
        <form onSubmit={ handleSubmit }>
          <Typography variant="h6">Track the calories of an activity</Typography>
          <Typography variant="body1">Start by searching and adding an activity you did like running, along with a date</Typography>

          <FormInput type="date" required onChange={ handleChange }
                      name="dateTracked" value={ formFields.dateTracked }></FormInput>
          
          <FormInput label="Activity" type="text" required onChange={ handleChange }
                              name="activity" value={ formFields.activity }></FormInput>
          
          <Typography paragraph>Optional:</Typography>
          <FormInput label="Weight (pounds)" type="text" onChange={ handleChange }
                              name="weightPounds" value={ formFields.weightPounds }></FormInput>

          <FormInput label="Duration (minutes)" type="text" onChange={ handleChange }
                      name="durationMinutes" value={ formFields.durationMinutes }></FormInput>

          <Button type="submit">Search Activity</Button>
        </form>
      </SimplePaper>
    </ActivityDateFormContainer>
  )
}

export default ActivityDateForm