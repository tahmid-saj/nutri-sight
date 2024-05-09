import "./calories-burned.styles.scss"

import ActivityDateForm from "./add-activity/activity-date-form/activity-date-form.component"
import ActivityDateTable from "./add-activity/activity-date-table/activity-date-table.component"

const CaloriesBurned = () => {
  return (
    <div className="calories-burned-container">
      <div className="calories-burned-summary-container">

      </div>

      <div className="calories-burned-view-container">

      </div>

      <div className="add-activity-container">
        <ActivityDateForm></ActivityDateForm>
        <ActivityDateTable></ActivityDateTable>
      </div>
    </div>
  )
}

export default CaloriesBurned