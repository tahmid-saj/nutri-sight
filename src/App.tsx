import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/shared/home/home.component";
import Navigation from "./routes/shared/navigation/navigation.component";
import AuthenticationRoute from "./routes/signed-out/authentication/authentication.component";

import DashboardRoute from "./routes/signed-out/dashboard/dashboard.component";
import NutrientPredictorRoute from "./routes/shared/nutrient-predictor/nutrient-predictor.component";
import NutritionTrackerRoute from "./routes/signed-out/nutrition-tracker/nutrition-tracker.component";
import FitnessRoute from "./routes/signed-out/fitness/fitness.component";
import CaloriesBurnedRoute from "./routes/signed-out/calories-burned/calories-burned.component"
import RecipesRoute from "./routes/shared/recipes/recipes.component";

import DashboardRouteSignedIn from "./routes/signed-in/dashboard/dashboard.component";
import NutritionTrackerRouteSignedIn from "./routes/signed-in/nutrition-tracker/nutrition-tracker.component";
import FitnessRouteSignedIn from "./routes/signed-in/fitness/fitness.component";
import CaloriesBurnedRouteSignedIn from "./routes/signed-in/calories-burned/calories-burned.component"

import { Fragment, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { checkUserSession, setCurrentUser } from "./store/shared/user/user.action";

import { onAuthStateChangedListener,
  createUserDocumentFromAuth
} from "./utils/firebase/firebase.utils";
import { selectCurrentUser } from "./store/shared/user/user.selector";
import { ResponsiveStylingContext } from "./contexts/shared/responsive-styling/responsive-styling.context";
import { COMMON_SPACING } from "./utils/constants/shared.constants";

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user)
    //   }
    //   dispatch(setCurrentUser(user))
    // })

    // return unsubscribe
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <HomeRoute/> }/>
        <Route path="nutrient-predictor" element={ <NutrientPredictorRoute/> }/>
        <Route path="recipes" element={ <RecipesRoute/> }/>

        {
          currentUser ? (
            <Fragment>
              <Route path="dashboard-signed-in" element={ <DashboardRouteSignedIn/> }/>
              <Route path="nutrition-tracker-signed-in" element={ <NutritionTrackerRouteSignedIn/> }/>
              <Route path="fitness-signed-in" element={ <FitnessRouteSignedIn/> }/>
              <Route path="calories-burned-signed-in" element={ <CaloriesBurnedRouteSignedIn/> }/>
            </Fragment>
          ) : (
            <Fragment>
              <Route path="dashboard" element={ <DashboardRoute/> }/>
              <Route path="nutrition-tracker" element={ <NutritionTrackerRoute/> }/>
              <Route path="fitness" element={ <FitnessRoute/> }/>
              <Route path="calories-burned" index element={ <CaloriesBurnedRoute/> }/>
              <Route path="auth" index element={ <AuthenticationRoute/> }/>
            </Fragment>
          )
        }
      </Route>
    </Routes>
  );
};

export default App;
