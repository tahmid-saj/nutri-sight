import OutlinedCard from "../../../shared/mui/card/card.component"
import SimplePaper from "../../../shared/mui/paper/paper.component"
import "./search-exercise-results.styles.scss"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"
import { Typography } from "@mui/material"
import SearchExerciseResult from "../search-exercise-result/search-exercise-result.component"
import { FitnessContext } from "../../../../contexts/signed-out/fitness/fitness.context"
import { useContext } from "react"

const paperStyles = {
  backgroundColor: COLOR_CODES.paper.formPaper,
}

const SearchExerciseResults = () => {
  const { exercisesSearchResults } = useContext(FitnessContext)

  return (
    <div className="fitness-search-exercise-results">
      <Typography variant="h6">Search results</Typography>

      <SimplePaper styles={ paperStyles }>
        {
          exercisesSearchResults.map((exerciseSearchResult) => {
            return (
              <SearchExerciseResult exerciseSearchResult={ exerciseSearchResult }></SearchExerciseResult>
            )
          }) 
        }
      </SimplePaper>
    </div>
  )
}

export default SearchExerciseResults