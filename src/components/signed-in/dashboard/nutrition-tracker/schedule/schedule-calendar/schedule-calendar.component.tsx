import "./schedule-calendar.styles.js"
import { CalendarTodoList, NutritionTrackerCalendarContainer } from "./schedule-calendar.styles.js";
import 'rsuite/Calendar/styles/index.css';
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants.js";

import { NutritionTrackerContext } from "../../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.js";
import { NutritionTrackedDay } from "../../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.types.js";

function getScheduledData(date: Date, nutritionTrackedDays: NutritionTrackedDay[]) {
  const dateStr = date.toISOString().split('T')[0]

  let scheduledNutritionTrackedDaysForDate: { calories: number }[] = []
  nutritionTrackedDays.map((nutritionTrackedDay) => {
    if (nutritionTrackedDay.dateTracked === dateStr) {
      scheduledNutritionTrackedDaysForDate.push({
        calories: nutritionTrackedDay.calories
      })
    }
  })

  return scheduledNutritionTrackedDaysForDate
}

const ScheduleCalendar = () => {
  const { nutritionTrackedDays, selectScheduledNutritionTrackedDay } = useContext(NutritionTrackerContext)

  // 

  function renderCell(date: Date) {
    const list = getScheduledData(date, nutritionTrackedDays);
    const displayList = list.filter((item, index) => index < 1);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      return (
        <Fragment>
          <CalendarTodoList>
            {displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{`Calories: ${item.calories}`}</b>
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
    
    selectScheduledNutritionTrackedDay(selectedDate)
  }

  return (
    <NutritionTrackerCalendarContainer>
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Nutrition tracker calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate } style={{ backgroundColor: COLOR_CODES.general["0"] }}/>
    </NutritionTrackerCalendarContainer>
  )
}

export default ScheduleCalendar