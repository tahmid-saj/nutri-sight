// notification api requests

import { NotificationAuthenticated } from "../../contexts/signed-in/notifications/notifications.types"
import { NotificationUnauthenticated } from "../../contexts/signed-out/notifications/notifications.types"
import { errorOnDeleteNotificationSetting, errorOnSaveNotificationSetting, 
  errorOnSendSESEmailVerification, errorOnSendSNSSubscriptionVerification, errorOnSNSUnsubscription } from "../errors/notifications.errors"

// sending SNS subscription email verification
export const sendSNSSubscriptionVerification = async (userId: string | null | undefined, email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_VERIFICATION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: userId,
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSendSNSSubscriptionVerification()
  }
}

export const sendSNSSubscriptionVerificationUnauth = async (email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_VERIFICATION_UNAUTH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSendSNSSubscriptionVerification()
  }
}

// sending SES email verification
export const sendSESVerification = async (email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SES_VERIFICATION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSendSESEmailVerification()
  }
}

// unsubscribing from SNS topic
export const sendSNSUnsubscription = async (userId: string | null | undefined, email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_UNSUBSCRIBE}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: userId,
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSNSUnsubscription()
  }
}

export const sendSNSUnsubscriptionUnauth = async (email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_UNSUBSCRIBE_UNAUTH}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSNSUnsubscription()
  }
}

// saving notification setting
export const saveNotificationSetting = async (notification: NotificationAuthenticated, 
  userId: string | null | undefined, email: string | null | undefined): Promise<void> => {
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SAVE_ALERT_SETTING}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...notification,
        userID: userId,
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSaveNotificationSetting()
  }
}

export const saveNotificationSettingUnauth = async (notification: NotificationUnauthenticated): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SAVE_ALERT_SETTING_UNAUTH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...notification
      })
    })

    return response.json()
  } catch (err) {
    errorOnSaveNotificationSetting()
  }
}

// delete notification setting
export const deleteNotificationSetting = async (notification: NotificationAuthenticated, userId: string | null | undefined, 
  email: string | null | undefined): Promise<void> => {
  
    try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_DELETE_ALERT_SETTING}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...notification,
        userID: userId,
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnDeleteNotificationSetting()
  }
}

export const deleteNotificationSettingUnauth = async (notification: NotificationUnauthenticated): Promise<void> => {
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_DELETE_ALERT_SETTING_UNAUTH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...notification
      })
    })

    return response.json()
  } catch (err) {
    errorOnDeleteNotificationSetting()
  }
}