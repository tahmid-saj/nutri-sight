import "./schedule-calendar.styles.tsx"
import { CalendarTodoList, CaloriesBurnedCalendarContainer } from "./schedule-calendar.styles.tsx";
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants.ts";

import { CaloriesBurnedContext } from "../../../../../../contexts/signed-in/calories-burned/calories-burned.context.tsx";
import { TrackedCaloriesBurned } from "../../../../../../contexts/signed-in/calories-burned/calories-burned.types.js";

function getScheduledData(date: Date, trackedCaloriesBurned: TrackedCaloriesBurned[]) {
  const dateStr = date.toISOString().split('T')[0]

  let scheduledTrackedCaloriesBurnedForDate: { caloriesBurned: number }[] = []
  trackedCaloriesBurned.map((trackedDay) => {
    if (trackedDay.dateTracked === dateStr) {
      scheduledTrackedCaloriesBurnedForDate.push({
        caloriesBurned: trackedDay.totalCaloriesBurned
      })
    }
  })

  return scheduledTrackedCaloriesBurnedForDate
}

const ScheduleCalendar = () => {
  const { trackedCaloriesBurned, selectScheduledTrackedCaloriesBurned } = useContext(CaloriesBurnedContext)

  function renderCell(date: Date) {
    const list = getScheduledData(date, trackedCaloriesBurned);
    const displayList = list.filter((item, index) => index < 1);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      return (
        <Fragment>
          <CalendarTodoList>
            {displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{`Calories: ${item.caloriesBurned}`}</b>
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
    
    selectScheduledTrackedCaloriesBurned(selectedDate)
  }

  return (
    <CaloriesBurnedCalendarContainer>
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Calories burned calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate } style={{ backgroundColor: COLOR_CODES.general["0"] }}/>
    </CaloriesBurnedCalendarContainer>
  )
}

export default ScheduleCalendar