import { createContext, FC, useState } from "react"
import { deleteNotificationSetting, saveNotificationSetting, 
  sendSESVerification, sendSNSSubscriptionVerification, sendSNSUnsubscription } from "../../../utils/api-requests/notification.requests"
import { NotificationAuthenticated, NotificationsContextType, NotificationsProviderProps } from "./notifications.types"

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

// helper functions
const createNotificationHelper = async (notifications: NotificationAuthenticated[] | undefined, notification: NotificationAuthenticated, 
  userId: string | null | undefined, email: string | null | undefined): Promise<NotificationAuthenticated[] | undefined> => {

  // save notification setting
  saveNotificationSetting(notification, userId, email)
  
  // send SNS / SES email verification
  sendSNSSubscriptionVerification(userId, email)
  sendSESVerification(email)

  if (!notifications) {
    return [ notification ]  
  }

  return [
    ...notifications,
    notification
  ]
}

const deleteNotificationHelper = async (notifications: NotificationAuthenticated[] | undefined, notification: NotificationAuthenticated, 
  userId: string | null | undefined, email: string | null | undefined): Promise<NotificationAuthenticated[] | undefined> => {

  if (!notifications) {
    return notifications
  }
  
  // delete single notification setting
  deleteNotificationSetting(notification, userId, email)

  const res = notifications?.filter(notif => {
    return !(
      notif.exerciseName === notification.exerciseName &&
      notif.exerciseDate === notification.exerciseDate
    );
  });

  if (res.length === 0) return undefined

  return res
}

const deleteAllNotificationsHelper = async (notifications: NotificationAuthenticated[] | undefined,
  userId: string | null | undefined, email: string | null | undefined): Promise<undefined> => {
  
  if (!notifications) {
    return notifications
  }

  // unsubscribe from SNS topic
  sendSNSUnsubscription(userId, email)

  return undefined
}

// initial state
export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: undefined,
  
  createNotification: (notification: NotificationAuthenticated) => {},
  deleteNotification: (notification: NotificationAuthenticated) => {},
  deleteAllNotifications: () => {}
})

// context component
export const NotificationsProvider: FC<NotificationsProviderProps> = ({ children }) => {
  const [notifications, setNotificationAuthenticateds] = useState<NotificationAuthenticated[] | undefined>(undefined)

  const currentUser = useSelector(selectCurrentUser)

  const createNotification = async (notification: NotificationAuthenticated) => {
    if (currentUser) {
      const res = await createNotificationHelper(notifications, notification, currentUser?.uid, currentUser?.email)
      setNotificationAuthenticateds(res)
    }
  }

  const deleteNotification = async (notification: NotificationAuthenticated) => {
    if (currentUser) {
      const res = await deleteNotificationHelper(notifications, notification, currentUser?.uid, currentUser?.email)
      setNotificationAuthenticateds(res)
    }
  }

  const deleteAllNotifications = async () => {
    if (currentUser) {
      const res = await deleteAllNotificationsHelper(notifications, currentUser?.uid, currentUser?.email)
      setNotificationAuthenticateds(res)
    }
  }

  return (
    <NotificationsContext.Provider value={{ notifications, createNotification, deleteNotification, deleteAllNotifications }}>
      { children }
    </NotificationsContext.Provider>
  )
}