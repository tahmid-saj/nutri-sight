import "./schedule-calendar.styles.scss"
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Lunch' }
      ];
    case 15:
      return [
        { time: '09:30 pm', title: 'Products Introduction Meeting' },
        { time: '12:30 pm', title: 'Client entertaining' },
        { time: '02:00 pm', title: 'Product design discussion' },
        { time: '05:00 pm', title: 'Product test and acceptance' },
        { time: '06:30 pm', title: 'Reporting' },
        { time: '10:00 pm', title: 'Going home to walk the dog' }
      ];
    default:
      return [];
  }
}

const ScheduleCalendar = () => {
  function renderCell(date) {
    const list = getTodoList(date);
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
                <Badge /> <b>{item.time}</b> - {item.title}
              </li>
            ))}
            {/* {moreCount ? moreItem : null} */}
          </ul>
          {moreCount} more
        </Fragment>
      );
    }

    return null;
  }

  const onSelectDate = (date) => {
    alert("Date selected: " + date)
  }

  return (
    <div className="fitness-schedule-calendar-container">
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Exercises calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate }/>
    </div>
  )
}

export default ScheduleCalendar