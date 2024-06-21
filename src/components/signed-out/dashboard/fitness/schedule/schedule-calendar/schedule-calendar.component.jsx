import "./schedule-calendar.styles.scss"
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { FitnessContext } from "../../../../../../contexts/signed-out/fitness/fitness.context";
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants";

function getScheduledData(date, exercises) {
  date = date.toISOString().split('T')[0]

  let scheduledExercisesForDate = []
  exercises.map((exercise) => {
    if (exercise.exerciseDate === date) {
      scheduledExercisesForDate.push({
        type: exercise.exerciseType,
        name: exercise.exerciseName
      })
    }
  })

  return scheduledExercisesForDate
}

const ScheduleCalendar = () => {
  const { exercises, selectScheduledExercise } = useContext(FitnessContext)

  function renderCell(date) {
    const list = getScheduledData(date, exercises);
    const displayList = list.filter((item, index) => index < 1);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      return (
        <Fragment>
          <ul className="calendar-todo-list">
            {displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{item.type}</b> - {item.name}
              </li>
            ))}
            {moreCount ? `${moreCount} more` : null}
          </ul>
          {/* {moreCount} more */}
        </Fragment>
      );
    }

    return null;
  }

  const onSelectDate = (date) => {
    const selectedDate = date.toISOString().split('T')[0]
    console.log(selectedDate)
    selectScheduledExercise(selectedDate)
  }

  return (
    <div className="fitness-schedule-calendar-container" style={{ backgroundColor: COLOR_CODES.general["0"] }}>
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Exercises calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate } style={{ backgroundColor: COLOR_CODES.general["0"] }}/>
    </div>
  )
}

export default ScheduleCalendar