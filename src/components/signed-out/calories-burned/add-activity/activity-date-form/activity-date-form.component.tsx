import Button from "../../../../shared/button/button.component.tsx"
import "./activity-date-form.styles.tsx"
import { ActivityDateFormContainer } from "./activity-date-form.styles.tsx"
import { useState, useContext, FormEvent, ChangeEvent } from "react"
import FormInput from "../../../../shared/form-input/form-input.component.tsx"

import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context.tsx"
import { Typography } from "@mui/material"
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.ts"

type FormFields = {
  activity: string,
  dateTracked: string,
  weightPounds: string,
  durationMinutes: string
}

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
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)
  const { searchActivity } = useContext(CaloriesBurnedContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await searchActivity(formFields)
    resetFormFields()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <ActivityDateFormContainer>
      <div className="container">
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

            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Search Activity</Button>
                </div>
              </div>
            </div>
          </form>
        </SimplePaper>
      </div>
    </ActivityDateFormContainer>
  )
}

export default ActivityDateForm