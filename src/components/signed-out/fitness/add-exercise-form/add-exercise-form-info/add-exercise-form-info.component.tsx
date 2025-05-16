import "./add-exercise-form-info.styles.scss"
import { Divider, Typography } from "@mui/material"
import { FitnessContext } from "../../../../../contexts/signed-out/fitness/fitness.context"
import { useContext } from "react"

const AddExerciseFormInfo = () => {
  const { selectedSearchedExercise } = useContext(FitnessContext)

  return (
    <div className="fitness-add-exercise-form-info">
      <Typography sx={{ display: "flex" }} 
        variant="body1">{`${selectedSearchedExercise?.exerciseName}`}</Typography>
      <Typography sx={{ display: "flex" }} 
        variant="body1">{`Type: ${selectedSearchedExercise?.exerciseType}`}</Typography>

      <br/>
      <Divider/>
      <br/>

      <Typography sx={{ display: "flex" }} 
        variant="body1">{`Muscle: ${selectedSearchedExercise?.exerciseMuscle}`}</Typography>
      <Typography sx={{ display: "flex" }} 
        variant="body1">{`Equipment: ${selectedSearchedExercise?.exerciseEquipment}`}</Typography>
      <Typography sx={{ display: "flex" }} 
            variant="body1">{`Difficulty: ${selectedSearchedExercise?.exerciseDifficulty}`}</Typography>

      <br/>
      <Divider/>
      <br/>

      <Typography sx={{ display: "flex", whiteSpace: "pre-wrap" }} 
            variant="body1">{`Instructions: \n\n${selectedSearchedExercise?.exerciseInstructions}`}</Typography>
    </div>
  )
}

export default AddExerciseFormInfo