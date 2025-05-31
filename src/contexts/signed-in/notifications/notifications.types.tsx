import { ReactNode } from "react";

// notifications types

export interface NotificationsContextType {
  notifications: NotificationAuthenticated[] | undefined,
  
  createNotification: (notification: NotificationAuthenticated) => void,
  deleteNotification: (notification: NotificationAuthenticated) => void,
  deleteAllNotifications: () => void
}

export interface NotificationsProviderProps {
  children: ReactNode
}

export type NotificationAuthenticated = {
  exerciseName: string,
  exerciseDate: string
}