import { ChangeEvent, FormEvent, Fragment, useContext, useState } from "react"
import "./add-exercise-form.styles.tsx"
import { FitnessAddExerciseFormContainer, FitnessAddExerciseForm } from "./add-exercise-form.styles.tsx"
import { Typography } from "@mui/material"
import FormInput from "../../../shared/form-input/form-input.component.tsx"
import { ButtonsContainer } from "../../../shared/button/button.styles.tsx"
import Button from "../../../shared/button/button.component.tsx"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import AddExerciseFormInfo from "./add-exercise-form-info/add-exercise-form-info.component.tsx"
import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context.tsx"

type FormFields = {
  exerciseDate: string,
  exerciseSets: string,
  exerciseReps: string
}

const defaultFormFields = {
  exerciseDate: "",
  exerciseSets: "",
  exerciseReps: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"],
}

const AddExerciseForm = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)
  const { addExercise, selectedSearchedExercise } = useContext(FitnessContext)

  if (!selectedSearchedExercise) {
    return (
      <Fragment></Fragment>
    )
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formFields.exerciseDate || formFields.exerciseDate === "") {
      
      return
    }

    addExercise(formFields)
    resetFormFields()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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