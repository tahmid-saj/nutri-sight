import "./add-exercise-form-info.styles.scss"
import { Typography } from "@mui/material"

const AddExerciseFormInfo = () => {
  return (
    <div className="fitness-add-exercise-form-info">
      <Typography sx={{ display: "flex" }} 
        variant="body1">{`Name`}</Typography>
      <Typography sx={{ display: "flex" }} 
        variant="body1">{`Type`}</Typography>

      <Typography sx={{ display: "flex" }} 
        variant="body1">{`Muscle`}</Typography>
      <Typography sx={{ display: "flex" }} 
        variant="body1">{`Equipment`}</Typography>
      <Typography sx={{ display: "flex" }} 
            variant="body1">{`Difficulty`}</Typography>

      <Typography sx={{ display: "flex" }} 
            variant="body1">{`Instructions`}</Typography>
    </div>
  )
}

export default AddExerciseFormInfo