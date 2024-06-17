import { Divider } from "@mui/material"
import AddExerciseForm from "../../../components/signed-out/fitness/add-exercise-form/add-exercise-form.component"
import ScheduleCalendar from "../../../components/signed-out/fitness/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "../../../components/signed-out/fitness/schedule/schedule-day-info/schedule-day-info.component"
import SearchExerciseForm from "../../../components/signed-out/fitness/search-exercise-form/search-exercise-form.component"
import SearchExerciseResults from "../../../components/signed-out/fitness/search-exercise-results/search-exercise-results.component"
import "./fitness.styles.scss"

const Fitness = () => {
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
        <SearchExerciseResults></SearchExerciseResults>
        <AddExerciseForm></AddExerciseForm>
      </div>
    </div>
  )
}

export default Fitness