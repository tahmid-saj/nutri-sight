import "./schedule-calendar.styles.scss"
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";
import { useDispatch, useSelector } from "react-redux";
import { selectNutritionTrackedDays } from "../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";
import { selectScheduledNutritionTrackedDay } from "../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action";

function getScheduledData(date, nutritionTrackedDays) {
  date = date.toISOString().split('T')[0]

  let scheduledNutritionTrackedDaysForDate = []
  nutritionTrackedDays.map((nutritionTrackedDay) => {
    if (nutritionTrackedDay.dateTracked === date) {
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

  // console.log(nutritionTrackedDays)

  function renderCell(date) {
    const list = getScheduledData(date, nutritionTrackedDays);
    const displayList = list.filter((item, index) => index < 1);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      return (
        <Fragment>
          <ul className="calendar-todo-list">
            {displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{`Calories: ${item.calories}`}</b>
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
    dispatch(selectScheduledNutritionTrackedDay(selectedDate))
  }

  return (
    <div className="nutrition-tracker-schedule-calendar-container" style={{ backgroundColor: COLOR_CODES.general["0"] }}>
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Nutrition tracker calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate } style={{ backgroundColor: COLOR_CODES.general["0"] }}/>
    </div>
  )
}

export default ScheduleCalendar