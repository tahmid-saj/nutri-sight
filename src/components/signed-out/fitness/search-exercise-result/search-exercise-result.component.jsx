import OutlinedCard from "../../../shared/mui/card/card.component"
import { Typography } from "@mui/material"
import "./search-exercise-result.styles.scss"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"

const outlinedCardStyles = {
  backgroundColor: COLOR_CODES.card.infoCard
}

const SearchExerciseResult = ({ exerciseSearchResult }) => {
  return (
    <div className="fitness-search-exercise-result">
      <OutlinedCard styles={ outlinedCardStyles }>
        <div className="fitness-search-result-info">
          <Typography sx={{ display: "flex" }} 
            variant="body1">{`${exerciseSearchResult.exerciseName}`}</Typography>

          <Typography sx={{ display: "flex" }} 
            variant="body1">{`Type: ${exerciseSearchResult.exerciseType}`}</Typography>

          <Typography sx={{ display: "flex" }} 
            variant="body2">{`Muscle: ${exerciseSearchResult.exerciseMuscle}`}</Typography>

          <Typography sx={{ display: "flex" }} 
            variant="body2">{`Equipment: ${exerciseSearchResult.exerciseEquipment}`}</Typography>

          <Typography sx={{ display: "flex" }} 
            variant="body2">{`Difficulty: ${exerciseSearchResult.exercistDifficulty}`}</Typography>
        </div>
      </OutlinedCard>
    </div>
  )
}

export default SearchExerciseResult