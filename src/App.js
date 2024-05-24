import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/shared/home/home.component";
import Navigation from "./routes/shared/navigation/navigation.component";
import AuthenticationRoute from "./routes/signed-out/authentication/authentication.component";

import DashboardRoute from "./routes/signed-out/dashboard/dashboard.component";
import NutrientPredictorRoute from "./routes/shared/nutrient-predictor/nutrient-predictor.component";
import NutritionTrackerRoute from "./routes/signed-out/nutrition-tracker/nutrition-tracker.component";
import CaloriesBurnedRoute from "./routes/signed-out/calories-burned/calories-burned.component"
import RecipesRoute from "./routes/shared/recipes/recipes.component";

import DashboardRouteSignedIn from "./routes/signed-in/dashboard/dashboard.component";
import NutritionTrackerRouteSignedIn from "./routes/signed-in/nutrition-tracker/nutrition-tracker.component";
import CaloriesBurnedRouteSignedIn from "./routes/signed-in/calories-burned/calories-burned.component"

import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setCurrentUser } from "./store/shared/user/user.action";

import { onAuthStateChangedListener,
  createUserDocumentFromAuth
} from "./utils/firebase/firebase.utils";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user))
    })

    return unsubscribe
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <HomeRoute/> }/>
        <Route path="dashboard" element={ <DashboardRoute/> }/>
        <Route path="nutrient-predictor" element={ <NutrientPredictorRoute/> }/>
        <Route path="nutrition-tracker" element={ <NutritionTrackerRoute/> }/>
        <Route path="calories-burned" index element={ <CaloriesBurnedRoute/> }/>
        <Route path="recipes" element={ <RecipesRoute/> }/>
        <Route path="auth" index element={ <AuthenticationRoute/> }/>

        <Route path="dashboard-signed-in" element={ <DashboardRouteSignedIn/> }/>
        <Route path="nutrition-tracker-signed-in" element={ <NutritionTrackerRouteSignedIn/> }/>
        <Route path="calories-burned-signed-in" element={ <CaloriesBurnedRouteSignedIn/> }/>
      </Route>
    </Routes>
  );
};

export default App;
