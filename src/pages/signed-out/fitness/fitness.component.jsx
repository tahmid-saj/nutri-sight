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
import { Typography } from "@mui/material"
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js"

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

        {
          exercisesSearchResults.length !== 0 ?
          <FitnessSearchAddContainer>
            <div className="container">
              <Typography sx={{ display: "flex", justifyContent: "left", color: COLOR_CODES.general["0"] }} variant="h6">Search results</Typography>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <SearchExerciseResults></SearchExerciseResults>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <AddExerciseForm></AddExerciseForm>
                </div>
              </div>
            </div>
          </FitnessSearchAddContainer> : null
        }
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