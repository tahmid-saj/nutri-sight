import { AddTrackedActivityInput, SearchActivityInput, FilterConditions } from "../../contexts/signed-out/calories-burned/calories-burned.types"
import { errorOnInvalidTrackedDate } from "../errors/calories-burned.errors"
import { REGEX_PATTERNS } from "./regex.constants"

// calories burned validations

// context

export const validateSearchActivity = (trackedDayInfo: SearchActivityInput) => {
  // number
  if (!(REGEX_PATTERNS.floatNumbers.test(String(trackedDayInfo.weightPounds))) || Number(trackedDayInfo.weightPounds) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(trackedDayInfo.durationMinutes))) || Number(trackedDayInfo.durationMinutes) < 0) {
    return true
  }

  return false
}

export const validateAddTrackedActivityDate = (trackedDayInfo: AddTrackedActivityInput) => {
  const today = new Date()

  if (trackedDayInfo.dateTracked && trackedDayInfo.dateTracked > today) {
    errorOnInvalidTrackedDate()
    return true
  }

  return false
}

export const validateFilterActivityDates = (filterConditions: FilterConditions) => {
  const today = new Date()

  // number
  if (!(REGEX_PATTERNS.floatNumbers.test(String(filterConditions.durationMinutes))) || Number(filterConditions.durationMinutes) < 0) {
    return true
  }

  if (filterConditions.dateTracked && filterConditions.dateTracked > today) {
    errorOnInvalidTrackedDate()
    return true
  }

  return false
}

export const validateRemoveActivityDate = (activityId: number) => {
  return false
}