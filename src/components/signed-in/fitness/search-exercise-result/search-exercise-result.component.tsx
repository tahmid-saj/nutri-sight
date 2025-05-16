import OutlinedCard from "../../../shared/mui/card/card.component.tsx"
import { Typography } from "@mui/material"
import "./search-exercise-result.styles.tsx"
import { FitnessSearchResultInfo } from "./search-exercise-result.styles.tsx"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { MouseEvent, useContext } from "react"
import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context.tsx"
import { ExerciseSearchResult } from "../../../../contexts/signed-in/fitness/fitness.types.js"

const outlinedCardStyles = {
  backgroundColor: COLOR_CODES.general["0"]
}

const SearchExerciseResult = ({ exerciseSearchResult }: { exerciseSearchResult: ExerciseSearchResult }) => {
  const { selectSearchedExercises } = useContext(FitnessContext)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    selectSearchedExercises(exerciseSearchResult)
  }

  return (
    <OutlinedCard styles={ outlinedCardStyles }>
      <FitnessSearchResultInfo onClick={ handleClick }>
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
      </FitnessSearchResultInfo>
    </OutlinedCard>
  )
}

export default SearchExerciseResult