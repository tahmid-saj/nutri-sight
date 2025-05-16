import OutlinedCard from "../../../shared/mui/card/card.component.tsx"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"
import "./search-exercise-results.styles.tsx"
import { FitnessSearchExerciseResults } from "./search-exercise-results.styles.tsx"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { Typography } from "@mui/material"
import SearchExerciseResult from "../search-exercise-result/search-exercise-result.component.tsx"
import { FitnessContext } from "../../../../contexts/signed-in/fitness/fitness.context.tsx"
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