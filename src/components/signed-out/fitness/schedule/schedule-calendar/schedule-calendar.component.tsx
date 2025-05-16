import "./schedule-calendar.styles.tsx"
import { CalendarTodoList, FitnessScheduleCalendarContainer } from "./schedule-calendar.styles.tsx";
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { FitnessContext } from "../../../../../contexts/signed-out/fitness/fitness.context.tsx";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.ts";
import { Exercise } from "../../../../../contexts/signed-out/fitness/fitness.types.js";

function getScheduledData(date: Date, exercises: Exercise[]) {
  const dateStr = date.toISOString().split('T')[0]

  let scheduledExercisesForDate: { type: string, name: string }[] = []
  exercises.map((exercise) => {
    if (exercise.exerciseDate === dateStr) {
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

  function renderCell(date: Date) {
    const list = getScheduledData(date, exercises);
    const displayList = list.filter((item, index) => index < 1);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      return (
        <Fragment>
          <CalendarTodoList>
            {displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{item.type}</b> - {item.name}
              </li>
            ))}
            {moreCount ? `${moreCount} more` : null}
          </CalendarTodoList>
          {/* {moreCount} more */}
        </Fragment>
      );
    }

    return null;
  }

  const onSelectDate = (date: Date) => {
    const selectedDate = date.toISOString().split('T')[0]
    
    selectScheduledExercise(selectedDate)
  }

  return (
    <FitnessScheduleCalendarContainer>
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Exercises calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate } style={{ backgroundColor: COLOR_CODES.general["0"] }}/>
    </FitnessScheduleCalendarContainer>
  )
}

export default ScheduleCalendar