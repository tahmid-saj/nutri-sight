import "./upcoming-exercises.styles.jsx"
import { UpcomingExercisesContainer, UpcomingExercisesScheduled,
  UpcomingExerciseContainer 
} from "./upcoming-exercises.styles.jsx"
import { Fragment, useContext } from "react"
import { FitnessContext } from "../../../../../contexts/signed-out/fitness/fitness.context.js"
import OutlinedCard from "../../../../shared/mui/card/card.component.jsx"
import { Divider, Typography } from "@mui/material"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.js"

const outlinedCardStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.exercisesInfoCard.width,
}

const UpcomingExercises = () => {
  const { upcomingExercisesView } = useContext(FitnessContext)

  return (
    <UpcomingExercisesContainer>
      <Typography sx={{ display: "center", justifyContent: "center", color: COLOR_CODES.general["1"], marginBottom: "1%" }}
        variant="h6">
        Upcoming scheduled exercises
      </Typography>

      <UpcomingExercisesScheduled>
        <div className="container">
          <div className="row justify-content-evenly align-items-center">
            {
              upcomingExercisesView.map((upcomingExercise, index) => {
                return (
                  <div className="col-sm-12 col-md-4 col-lg-3">
                    <OutlinedCard styles={ outlinedCardStyles }>
                      <UpcomingExerciseContainer key={ index }>
                        <Typography sx={{ display: "flex", justifyContent: "center" }} 
                          variant="h6">{`${upcomingExercise.exerciseName}`}</Typography>
                        <Typography sx={{ display: "flex", justifyContent: "center" }} 
                          variant="body1">{`${upcomingExercise.exerciseDate}`}</Typography>

                        <br/>
                        <Divider/>
                        <br/>

                        <Typography sx={{ display: "flex", justifyContent: "center" }} 
                          variant="body1">{`Sets: ${upcomingExercise.exerciseSets}`}</Typography>
                        <Typography sx={{ display: "flex", justifyContent: "center" }} 
                          variant="body1">{`Reps: ${upcomingExercise.exerciseReps}`}</Typography>
                        <Typography sx={{ display: "flex", justifyContent: "center" }} 
                          variant="body1">{`Type: ${upcomingExercise.exerciseType}`}</Typography>

                        <br/>
                        <Divider/>
                        <br/>

                        <Typography sx={{ display: "flex", justifyContent: "center" }} 
                          variant="body2">{`Muscle: ${upcomingExercise.exerciseMuscle}`}</Typography>
                        <Typography sx={{ display: "flex", justifyContent: "center" }} 
                          variant="body2">{`Equipment: ${upcomingExercise.exerciseEquipment}`}</Typography>
                        <Typography sx={{ display: "flex", justifyContent: "center" }} 
                          variant="body2">{`Difficulty: ${upcomingExercise.exerciseDifficulty}`}</Typography>
                      </UpcomingExerciseContainer>
                    </OutlinedCard>
                  </div>
                )
              })
            }
          </div>
        </div>
      </UpcomingExercisesScheduled>
    </UpcomingExercisesContainer>
  )
}

export default UpcomingExercises