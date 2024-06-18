import { Divider } from "@mui/material"
import AddExerciseForm from "../../../components/signed-in/fitness/add-exercise-form/add-exercise-form.component"
import ScheduleCalendar from "../../../components/signed-in/fitness/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "../../../components/signed-in/fitness/schedule/schedule-day-info/schedule-day-info.component"
import SearchExerciseForm from "../../../components/signed-in/fitness/search-exercise-form/search-exercise-form.component"
import SearchExerciseResults from "../../../components/signed-in/fitness/search-exercise-results/search-exercise-results.component"
import "./fitness.styles.scss"
import { useContext, Fragment } from "react"
import { FitnessContext } from "../../../contexts/signed-in/fitness/fitness.context"

const Fitness = () => {
  const { exercises, exercisesSearchResults } = useContext(FitnessContext)

  console.log(exercises, exercisesSearchResults)

  return (
    <div className="fitness-container">
      <div className="fitness-schedule-container">
        <ScheduleCalendar></ScheduleCalendar>

        <br/>
        <Divider/>
        <br/>

        <ScheduleDayInfo></ScheduleDayInfo>
      </div>

      <br/>
      <Divider/>
      <br/>

      <SearchExerciseForm></SearchExerciseForm>

      <br/>
      <Divider/>
      <br/>

      <div className="fitness-search-add-container">
        {
          exercisesSearchResults.length !== 0 ?
          <Fragment>
            <SearchExerciseResults></SearchExerciseResults>
            <AddExerciseForm></AddExerciseForm>
          </Fragment> : null
        }
      </div>
    </div>
  )
}

export default Fitness