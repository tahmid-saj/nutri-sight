import OutlinedCard from "../../../shared/mui/card/card.component"
import SimplePaper from "../../../shared/mui/paper/paper.component"
import "./search-exercise-results.styles.jsx"
import { FitnessSearchExerciseResults } from "./search-exercise-results.styles.jsx"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"
import { Typography } from "@mui/material"
import SearchExerciseResult from "../search-exercise-result/search-exercise-result.component"
import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context"
import { useContext } from "react"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["7"],
  overflow: "scroll",
  height: "50rem",
  scrollbarColor: `${COLOR_CODES.scrollbar.scroll} ${COLOR_CODES.scrollbar.background}`,
  scrollbarWidth: "thin"
}

const SearchExerciseResults = () => {
  const { exercisesSearchResults } = useContext(FitnessContext)

  return (
    <FitnessSearchExerciseResults>
      <SimplePaper styles={ paperStyles }>
        {
          exercisesSearchResults.map((exerciseSearchResult) => {
            return (
              <SearchExerciseResult exerciseSearchResult={ exerciseSearchResult }></SearchExerciseResult>
            )
          }) 
        }
      </SimplePaper>
    </FitnessSearchExerciseResults>
  )
}

export default SearchExerciseResults

// style="overflow:scroll; height:400px;