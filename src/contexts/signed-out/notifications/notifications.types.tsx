import { ReactNode } from "react";

// notifications types

export interface NotificationsContextType {
  notifications: NotificationUnauthenticated[] | undefined,
  
  createNotification: (notification: NotificationUnauthenticated) => void,
  deleteNotification: (notification: NotificationUnauthenticated) => void,
  deleteAllNotifications: () => void
}

export interface NotificationsProviderProps {
  children: ReactNode
}

export type NotificationUnauthenticated = {
  exerciseName: string,
  exerciseDate: string,
  email: string
}