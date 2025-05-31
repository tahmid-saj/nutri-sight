import { createContext, FC, useState } from "react"

import { NotificationsContextType, NotificationsProviderProps, NotificationUnauthenticated } from "./notifications.types";
import { deleteNotificationSettingUnauth, saveNotificationSettingUnauth, 
  sendSESVerification, sendSNSSubscriptionVerificationUnauth, sendSNSUnsubscriptionUnauth } from "../../../utils/api-requests/notification.requests";

// helper functions
const createNotificationHelper = async (notifications: NotificationUnauthenticated[] | undefined, 
  notification: NotificationUnauthenticated): Promise<NotificationUnauthenticated[] | undefined> => {

  // save notification setting
  saveNotificationSettingUnauth(notification)
  
  // send SNS / SES email verification
  sendSNSSubscriptionVerificationUnauth(notification.email)
  sendSESVerification(notification.email)

  if (!notifications) {
    return [ notification ]  
  }

  return [
    ...notifications,
    notification
  ]
}

const deleteNotificationHelper = async (notifications: NotificationUnauthenticated[] | undefined, 
  notification: NotificationUnauthenticated): Promise<NotificationUnauthenticated[] | undefined> => {

  if (!notifications) {
    return notifications
  }

  // unsubscribe from SNS topic
  sendSNSUnsubscriptionUnauth(notification.email)
  
  // delete single notification setting
  deleteNotificationSettingUnauth(notification)

  const res = notifications?.filter(notif => {
    return !(
      notif.exerciseName === notification.exerciseName &&
      notif.exerciseDate === notification.exerciseDate &&
      notif.email === notification.email
    );
  });

  if (res.length === 0) return undefined

  return res
}

const deleteAllNotificationsHelper = async (notifications: NotificationUnauthenticated[] | undefined): Promise<undefined> => {
  if (!notifications) {
    return notifications
  }

  // unsubscribe from SNS topic for all notifications' emails
  notifications.map((notification) => {
    sendSNSUnsubscriptionUnauth(notification.email)
  })

  return undefined
}

// initial state
export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: undefined,
  
  createNotification: (notification: NotificationUnauthenticated) => {},
  deleteNotification: (notification: NotificationUnauthenticated) => {},
  deleteAllNotifications: () => {}
})

// context component
export const NotificationsProvider: FC<NotificationsProviderProps> = ({ children }) => {
  const [notifications, setNotificationAuthenticateds] = useState<NotificationUnauthenticated[] | undefined>(undefined)

  const createNotification = async (notification: NotificationUnauthenticated) => {
    const res = await createNotificationHelper(notifications, notification)
    setNotificationAuthenticateds(res)
  }

  const deleteNotification = async (notification: NotificationUnauthenticated) => {
    const res = await deleteNotificationHelper(notifications, notification)
    setNotificationAuthenticateds(res)
  }

  const deleteAllNotifications = async () => {
    const res = await deleteAllNotificationsHelper(notifications)
    setNotificationAuthenticateds(res)
  }

  return (
    <NotificationsContext.Provider value={{ notifications, createNotification, deleteNotification, deleteAllNotifications }}>
      { children }
    </NotificationsContext.Provider>
  )
}