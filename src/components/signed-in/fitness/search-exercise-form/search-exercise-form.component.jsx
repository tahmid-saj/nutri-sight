import { Fragment, useContext, useState } from "react"
import "./search-exercise-form.styles.scss"
import { Typography } from "@mui/material"
import FormInput from "../../../shared/form-input/form-input.component"
import { DropButton } from "../../../shared/drop-button/drop-button.styles"
import Button from "../../../shared/button/button.component"
import { ButtonsContainer } from "../../../shared/button/button.styles"
import SimplePaper from "../../../shared/mui/paper/paper.component"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"

import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context"

const defaultFormFields = {
  exerciseName: "",
  exerciseType: "",
  exerciseMuscle: "",
  exerciseDifficulty: "",
}

const paperStyles = {
  backgroundColor: COLOR_CODES.paper.formPaper,
}

const SearchExerciseForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { searchExercise } = useContext(FitnessContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formFields.exerciseMuscle || formFields.exerciseMuscle === "") {
      console.log("please fill in all info")
      return
    }

    searchExercise(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="fitness-search-exercise-form-container">
      <Typography variant="h6">Search exercises</Typography>

      <SimplePaper styles={ paperStyles }>
        <form onSubmit={ handleSubmit } className="fitness-search-exercise-form">
          <div className="fitness-search-exercise-form-dropdown">
            <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%", marginTop: "4%" }} paragraph>Muscle</Typography>
            <DropButton name="exerciseMuscle" id="exerciseMuscle" 
                    required onChange={ handleChange } value={ formFields.exerciseMuscle }>
              <option value="abdominals">Abdominals</option>
              <option value="abductors">Abductors</option>
              <option value="biceps">Biceps</option>
              <option value="calves">Calves</option>
              <option value="chest">Chest</option>
              <option value="forearms">Forearms</option>
              <option value="glutes">Glutes</option>
              <option value="hamstrings">Hamstrings</option>
              <option value="lats">Lats</option>
              <option value="lower_back">Lower back</option>
              <option value="middle_back">Middle back</option>
              <option value="neck">Neck</option>
              <option value="quadriceps">Quadriceps</option>
              <option value="traps">Traps</option>
              <option value="triceps">Triceps</option>
            </DropButton>
          </div>

          <Typography sx={{ marginTop: "2%" }} paragraph>Optional:</Typography>

          <div className="fitness-search-exercise-form-dropdown">
            <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>Type</Typography>
            <DropButton name="exerciseType" id="exerciseType" 
                    onChange={ handleChange } value={ formFields.exerciseType }>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="stretching">Stretching</option>
              <option value="plyometrics">Plyometrics</option>
              <option value="strongman">Strongman</option>
              <option value="olympic_weightlifting">Olympic Weightlifting</option>
            </DropButton>
          </div>
          
          <FormInput label="Name of exercise" type="text" onChange={ handleChange }
            name="exerciseName" value={ formFields.exerciseName }></FormInput>

          <div className="fitness-search-exercise-form-dropdown">
            <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>Difficulty</Typography>
            <DropButton name="exerciseDifficulty" id="exerciseDifficulty" 
                    onChange={ handleChange } value={ formFields.exerciseDifficulty }>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </DropButton>
          </div>

          <ButtonsContainer>
            <Button type="submit">Search</Button>
            <Button type="button" onClick={ resetFormFields }>Clear</Button>
          </ButtonsContainer>
        </form>

      </SimplePaper>
    </div>
  )
}

export default SearchExerciseForm