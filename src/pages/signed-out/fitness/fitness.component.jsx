import { Divider } from "@mui/material"
import AddExerciseForm from "../../../components/signed-out/fitness/add-exercise-form/add-exercise-form.component"
import ScheduleCalendar from "../../../components/signed-out/fitness/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "../../../components/signed-out/fitness/schedule/schedule-day-info/schedule-day-info.component"
import SearchExerciseForm from "../../../components/signed-out/fitness/search-exercise-form/search-exercise-form.component"
import SearchExerciseResults from "../../../components/signed-out/fitness/search-exercise-results/search-exercise-results.component"
import "./fitness.styles.jsx"
import { FitnessContainer, FitnessScheduleContainer,
  FitnessSearchAddContainer
} from "./fitness.styles.jsx"
import { useContext, Fragment } from "react"
import { FitnessContext } from "../../../contexts/signed-out/fitness/fitness.context"
import UpcomingExercises from "../../../components/signed-out/fitness/upcoming-exercises/upcoming-exercises.component"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddIcon from '@mui/icons-material/Add';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx"

const Fitness = () => {
  const { exercises, exercisesSearchResults, upcomingExercisesView } = useContext(FitnessContext)

  let tabList = []
  let panelList = []

  tabList.push({
    value: "add-exercise",
    icon: <AddIcon/>,
    label: "Add Exercise"
  })

  panelList.push({
    value: "add-exercise",
    children: (
      <Fragment>
        <SearchExerciseForm></SearchExerciseForm>

        <br/>
        <Divider/>
        <br/>

        <FitnessSearchAddContainer>
          {
            exercisesSearchResults.length !== 0 ?
            <Fragment>
              <SearchExerciseResults></SearchExerciseResults>
              <AddExerciseForm></AddExerciseForm>
            </Fragment> : null
          }
        </FitnessSearchAddContainer>
      </Fragment>
    )
  })

  if (upcomingExercisesView.length !== 0) {
    tabList.push({
      value: "upcoming-exercises",
      icon: <NotificationsActiveIcon/>,
      label: "Upcoming Exercises"
    })

    panelList.push({
      value: "upcoming-exercises",
      children: <UpcomingExercises/>
    })
  }

  return (
    <FitnessContainer>
      <FitnessScheduleContainer>
        <ScheduleCalendar></ScheduleCalendar>

        <br/>
        <Divider/>
        <br/>

        <ScheduleDayInfo></ScheduleDayInfo>
      </FitnessScheduleContainer>

      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </FitnessContainer>
  )

  // return (
  //   <FitnessContainer>
  //     <FitnessScheduleContainer>
  //       <ScheduleCalendar></ScheduleCalendar>

  //       <br/>
  //       <Divider/>
  //       <br/>

  //       <ScheduleDayInfo></ScheduleDayInfo>
  //     </FitnessScheduleContainer>

  //     {
  //       upcomingExercisesView.length !== 0 ?
  //       <UpcomingExercises></UpcomingExercises> : null
  //     }

  //     <br/>
  //     <Divider/>
  //     <br/>

  //     <SearchExerciseForm></SearchExerciseForm>

  //     <br/>
  //     <Divider/>
  //     <br/>

  //     <FitnessSearchAddContainer>
  //       {
  //         exercisesSearchResults.length !== 0 ?
  //         <Fragment>
  //           <SearchExerciseResults></SearchExerciseResults>
  //           <AddExerciseForm></AddExerciseForm>
  //         </Fragment> : null
  //       }
  //     </FitnessSearchAddContainer>
  //   </FitnessContainer>
  // )
}

export default Fitness