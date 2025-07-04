import { Divider } from "@mui/material"
import CreateNotification from "../../../components/signed-out/notifications/create-notification/create-notification.component"
import { AlertsContainer } from "./notifications.styles"
import AlertsList from "../../../components/signed-out/notifications/notifications-list/notifications-list.component"
import { useContext } from "react"
import { NotificationsContext } from "../../../contexts/signed-out/notifications/notifications.context"

const Alerts = () => {
  const { notifications } = useContext(NotificationsContext)

  return (
    <AlertsContainer>
      <CreateNotification/>

      <Divider/>

      {
        notifications !== undefined && notifications.length !== 0 && <AlertsList/>
      }
    </AlertsContainer>
  )
}

export default Alerts
