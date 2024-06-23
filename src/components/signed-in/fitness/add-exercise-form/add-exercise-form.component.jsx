import { Fragment, useContext, useState } from "react"
import "./add-exercise-form.styles.jsx"
import { FitnessAddExerciseFormContainer, FitnessAddExerciseForm } from "./add-exercise-form.styles.jsx"
import { Typography } from "@mui/material"
import FormInput from "../../../shared/form-input/form-input.component"
import { ButtonsContainer } from "../../../shared/button/button.styles"
import Button from "../../../shared/button/button.component"
import SimplePaper from "../../../shared/mui/paper/paper.component"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"
import AddExerciseFormInfo from "./add-exercise-form-info/add-exercise-form-info.component"
import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context"

const defaultFormFields = {
  exerciseDate: "",
  exerciseSets: "",
  exerciseReps: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"],
}

const AddExerciseForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { addExercise, selectedSearchedExercise } = useContext(FitnessContext)

  if (!selectedSearchedExercise) {
    return (
      <Fragment></Fragment>
    )
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formFields.exerciseDate || formFields.exerciseDate === "") {
      
      return
    }

    addExercise(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <FitnessAddExerciseFormContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ color: "black" }} variant="h6">Add exercise to the schedule</Typography>
        <AddExerciseFormInfo></AddExerciseFormInfo>

        <FitnessAddExerciseForm onSubmit={ handleSubmit }>
          <FormInput label="Scheduled date" type="date" required onChange={ handleChange }
              name="exerciseDate" value={ formFields.exerciseDate }></FormInput>

          <FormInput label="Sets" type="text" onChange={ handleChange }
              name="exerciseSets" value={ formFields.exerciseSets }></FormInput>
          
          <FormInput label="Reps" type="text" onChange={ handleChange }
              name="exerciseReps" value={ formFields.exerciseReps }></FormInput>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Add</Button>
                  <Button type="button" onClick={ resetFormFields }>Clear</Button>
                </div>
              </div>
            </div>
          </div>
        </FitnessAddExerciseForm>
      </SimplePaper>
    </FitnessAddExerciseFormContainer>
  )
}

export default AddExerciseForm