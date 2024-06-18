import OutlinedCard from "../../../shared/mui/card/card.component"
import { Typography } from "@mui/material"
import "./search-exercise-result.styles.scss"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"
import { useContext } from "react"
import { FitnessContext } from "../../../../contexts/signed-out/fitness/fitness.context"

const outlinedCardStyles = {
  backgroundColor: COLOR_CODES.general["5"]
}

const SearchExerciseResult = ({ exerciseSearchResult }) => {
  const { selectSearchedExercises } = useContext(FitnessContext)

  const handleClick = (event) => {
    event.preventDefault()

    selectSearchedExercises(exerciseSearchResult)
  }

  return (
    <OutlinedCard styles={ outlinedCardStyles }>
      <div className="fitness-search-result-info" onClick={ handleClick }>
        <Typography sx={{ display: "flex" }} 
          variant="body1">{`${exerciseSearchResult.exerciseName}`}</Typography>

        <Typography sx={{ display: "flex", whiteSpace: "pre-wrap" }} 
          variant="body1">{`Type: ${exerciseSearchResult.exerciseType}\n\n`}</Typography>

        <Typography sx={{ display: "flex" }} 
          variant="body2">{`Muscle: ${exerciseSearchResult.exerciseMuscle}`}</Typography>

        <Typography sx={{ display: "flex" }} 
          variant="body2">{`Equipment: ${exerciseSearchResult.exerciseEquipment}`}</Typography>

        <Typography sx={{ display: "flex" }} 
          variant="body2">{`Difficulty: ${exerciseSearchResult.exerciseDifficulty}`}</Typography>
      </div>
    </OutlinedCard>
  )
}

export default SearchExerciseResult