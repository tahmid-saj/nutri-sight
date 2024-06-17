import OutlinedCard from "../../../shared/mui/card/card.component"
import SimplePaper from "../../../shared/mui/paper/paper.component"
import "./search-exercise-results.styles.scss"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"
import { Typography } from "@mui/material"
import SearchExerciseResult from "../search-exercise-result/search-exercise-result.component"

const paperStyles = {
  backgroundColor: COLOR_CODES.paper.formPaper,
}

const SearchExerciseResults = () => {
  return (
    <div className="fitness-search-exercise-results">
      <Typography variant="h6">Search results</Typography>

      <SimplePaper styles={ paperStyles }>
        <SearchExerciseResult></SearchExerciseResult>
        <SearchExerciseResult></SearchExerciseResult>
      </SimplePaper>
    </div>
  )
}

export default SearchExerciseResults