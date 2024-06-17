import { useState } from "react"
import "./add-exercise-form.styles.scss"
import { Typography } from "@mui/material"
import FormInput from "../../../shared/form-input/form-input.component"
import { ButtonsContainer } from "../../../shared/button/button.styles"
import Button from "../../../shared/button/button.component"
import SimplePaper from "../../../shared/mui/paper/paper.component"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"
import AddExerciseFormInfo from "./add-exercise-form-info/add-exercise-form-info.component"

const defaultFormFields = {
  exerciseDate: "",
  exerciseSets: "",
  exerciseReps: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.paper.formPaper,
}

const AddExerciseForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formFields.exerciseDate || formFields.exerciseDate === "") {
      console.log("please fill in all info")
      return
    }

    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="fitness-add-exercise-form-container">
      <Typography variant="h6">Add exercise to the schedule</Typography>

      <SimplePaper styles={ paperStyles }>
        <AddExerciseFormInfo></AddExerciseFormInfo>

        <form onSubmit={ handleSubmit } className="fitness-add-exercise-form">
          <FormInput label="Scheduled date" type="date" required onChange={ handleChange }
              name="exerciseDate" value={ formFields.exerciseDate }></FormInput>

          <FormInput label="Sets" type="text" onChange={ handleChange }
              name="exerciseSets" value={ formFields.exerciseSets }></FormInput>
          
          <FormInput label="Reps" type="text" onChange={ handleChange }
              name="exerciseReps" value={ formFields.exerciseReps }></FormInput>
          
          <ButtonsContainer>
              <Button type="submit">Add</Button>
              <Button type="button" onClick={ resetFormFields }>Clear</Button>
          </ButtonsContainer>
        </form>
      </SimplePaper>
    </div>
  )
}

export default AddExerciseForm