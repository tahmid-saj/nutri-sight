import { errorOnInvalidTrackedDate } from "../errors/calories-burned.errors"

// calories burned validations

// context

export const validateSearchActivity = (trackedDayInfo) => {
  // number
  if (!(/^[0-9]*$/.test(String(trackedDayInfo.weightPounds))) || Number(trackedDayInfo.weightPounds) < 0 ||
    !(/^[0-9]*$/.test(String(trackedDayInfo.durationMinutes))) || Number(trackedDayInfo.durationMinutes) < 0) {
    return true
  }

  return false
}

export const validateAddTrackedActivityDate = (trackedDayInfo) => {
  const today = new Date()

  if (trackedDayInfo.dateTracked && trackedDayInfo.dateTracked > today) {
    errorOnInvalidTrackedDate()
    return true
  }

  return false
}

export const validateFilterActivityDates = (filterConditions) => {
  const today = new Date()

  // number
  if (!(/^[0-9]*$/.test(String(filterConditions.durationMinutes))) || Number(filterConditions.durationMinutes) < 0) {
    return true
  }

  if (filterConditions.dateTracked && filterConditions.dateTracked > today) {
    errorOnInvalidTrackedDate()
    return true
  }

  return false
}

export const validateRemoveActivityDate = (activityId) => {
  return false
}