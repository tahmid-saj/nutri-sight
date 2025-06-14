import "./schedule-calendar.styles.tsx"
import { CalendarTodoList, NutritionTrackerCalendarContainer } from "./schedule-calendar.styles.tsx";
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants.ts";
import { useDispatch, useSelector } from "react-redux";
import { selectNutritionTrackedDays } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector.ts";
import { selectScheduledNutritionTrackedDay } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action.ts";
import { NutritionTrackedDay } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.types.js";

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
  const dispatch = useDispatch()
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)

  // 

  function renderCell(date: Date) {
    const list = getScheduledData(date, nutritionTrackedDays!);
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
    
    dispatch(selectScheduledNutritionTrackedDay(selectedDate))
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