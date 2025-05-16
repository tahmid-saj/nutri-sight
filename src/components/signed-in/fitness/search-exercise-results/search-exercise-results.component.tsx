import OutlinedCard from "../../../shared/mui/card/card.component.js"
import SimplePaper from "../../../shared/mui/paper/paper.component.js"
import "./search-exercise-results.styles.js"
import { FitnessSearchExerciseResults } from "./search-exercise-results.styles.js"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js"
import { Typography } from "@mui/material"
import SearchExerciseResult from "../search-exercise-result/search-exercise-result.component.js"
import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context.js"
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