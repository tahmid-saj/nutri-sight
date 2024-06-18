import "./schedule-calendar.styles.scss"
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { FitnessContext } from "../../../../../contexts/signed-in/fitness/fitness.context";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";

function getScheduledData(date, exercises) {
  // const day = date.getDate();
  date = date.toISOString().split('T')[0]

  // switch (day) {
  //   case 10:
  //     return [
  //       { time: '10:30 am', title: 'Meeting' },
  //       { time: '12:00 pm', title: 'Lunch' }
  //     ];
  //   case 15:
  //     return [
  //       { time: '09:30 pm', title: 'Products Introduction Meeting' },
  //       { time: '12:30 pm', title: 'Client entertaining' },
  //       { time: '02:00 pm', title: 'Product design discussion' },
  //       { time: '05:00 pm', title: 'Product test and acceptance' },
  //       { time: '06:30 pm', title: 'Reporting' },
  //       { time: '10:00 pm', title: 'Going home to walk the dog' }
  //     ];
  //   default:
  //     return [];
  // }

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
      // const moreItem = (
      //   <li>
      //     <Whisper
      //       placement="top"
      //       trigger="click"
      //       speaker={
      //         <Popover>
      //           {list.map((item, index) => (
      //             <p key={index}>
      //               <b>{item.time}</b> - {item.title}
      //             </p>
      //           ))}
      //         </Popover>
      //       }
      //     >
      //       <h10>{moreCount} more</h10>
      //     </Whisper>
      //   </li>
      // );

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