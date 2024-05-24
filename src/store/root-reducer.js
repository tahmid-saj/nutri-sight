import { combineReducers } from "redux"

import { userReducer } from "./shared/user/user.reducer"
import { nutritionTrackerReducer } from "./signed-out/nutrition-tracker/nutrition-tracker.reducer"

export const rootReducer = combineReducers({
  user: userReducer,

  nutritionTracker: nutritionTrackerReducer
})