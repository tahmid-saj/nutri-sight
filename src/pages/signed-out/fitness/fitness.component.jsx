import { Divider } from "@mui/material"
import AddExerciseForm from "../../../components/signed-out/fitness/add-exercise-form/add-exercise-form.component"
import ScheduleCalendar from "../../../components/signed-out/fitness/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "../../../components/signed-out/fitness/schedule/schedule-day-info/schedule-day-info.component"
import SearchExerciseForm from "../../../components/signed-out/fitness/search-exercise-form/search-exercise-form.component"
import SearchExerciseResults from "../../../components/signed-out/fitness/search-exercise-results/search-exercise-results.component"
import "./fitness.styles.scss"
import { useContext, Fragment } from "react"
import { FitnessContext } from "../../../contexts/signed-out/fitness/fitness.context"
import UpcomingExercises from "../../../components/signed-out/fitness/upcoming-exercises/upcoming-exercises.component"

const Fitness = () => {
  const { exercises, exercisesSearchResults, upcomingExercisesView } = useContext(FitnessContext)

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

      {
        upcomingExercisesView.length !== 0 ?
        <UpcomingExercises></UpcomingExercises> : null
      }

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