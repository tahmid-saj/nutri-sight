import Button from "../../../shared/button/button.component.tsx"
import FormInput from "../../../shared/form-input/form-input.component.tsx"
import "./activity-date-filter.styles.tsx"
import { ActivityDateFilterContainer, FilterButtonsContainer } from "./activity-date-filter.styles.tsx"

import { useState, useContext, FormEvent, ChangeEvent, MouseEvent } from "react"
import { CaloriesBurnedContext } from "../../../../contexts/signed-out/calories-burned/calories-burned.context.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"
import { Typography } from "@mui/material"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"

type FormFields = {
  activity: string,
  dateTracked: string,
  durationMinutes: string
}

const defaultFormFields = {
  activity: "",
  dateTracked: "",
  durationMinutes: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  // width: COMMON_SPACING.filter.width
}

const ActivityDateFilter = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)
  const { filterActivityDates, clearActivityDatesFilter } = useContext(CaloriesBurnedContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formFields.activity === "" && formFields.dateTracked === "" &&
      !formFields.activity && !formFields.dateTracked &&
      !formFields.durationMinutes && !formFields.durationMinutes) {
        
        return
    }
     
    filterActivityDates(formFields)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleClearFilter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    resetFormFields()
    clearActivityDatesFilter()
  }

  return (
    <ActivityDateFilterContainer>
      <div className="container">
        <SimplePaper styles={ paperStyles }>
          <form onSubmit={ handleSubmit }>
            <Typography variant="h6">Filter activities</Typography>
            <FormInput type="date" onChange={ handleChange }
                        name="dateTracked" value={ formFields.dateTracked }></FormInput>
            
            <FormInput label="Activity" type="text" onChange={ handleChange }
                                name="activity" value={ formFields.activity }></FormInput>

            <FormInput label="Duration (minutes)" type="text" onChange={ handleChange }
                        name="durationMinutes" value={ formFields.durationMinutes }></FormInput>

            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Filter</Button>
                  <Button type="button" onClick={ handleClearFilter }>Clear</Button>
                </div>
              </div>
            </div>
          </form>
        </SimplePaper>
      </div>
    </ActivityDateFilterContainer>
  )
}

export default ActivityDateFilter