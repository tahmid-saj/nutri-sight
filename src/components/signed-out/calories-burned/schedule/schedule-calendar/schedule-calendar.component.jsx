import "./schedule-calendar.styles.jsx"
import { CalendarTodoList, CaloriesBurnedCalendarContainer } from "./schedule-calendar.styles.jsx";
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";

import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context";

function getScheduledData(date, trackedCaloriesBurned) {
  date = date.toISOString().split('T')[0]

  let scheduledTrackedCaloriesBurnedForDate = []
  trackedCaloriesBurned.map((trackedDay) => {
    if (trackedDay.dateTracked === date) {
      scheduledTrackedCaloriesBurnedForDate.push({
        caloriesBurned: trackedDay.totalCaloriesBurned
      })
    }
  })

  return scheduledTrackedCaloriesBurnedForDate
}

const ScheduleCalendar = () => {
  const { trackedCaloriesBurned, selectScheduledTrackedCaloriesBurned } = useContext(CaloriesBurnedContext)

  function renderCell(date) {
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

  const onSelectDate = (date) => {
    const selectedDate = date.toISOString().split('T')[0]
    console.log(selectedDate)
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