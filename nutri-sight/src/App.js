import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/shared/home/home.component";
import Navigation from "./routes/shared/navigation/navigation.component";
import AuthenticationRoute from "./routes/signed-out/authentication/authentication.component";
import NutrientPredictorRoute from "./routes/shared/nutrient-predictor/nutrient-predictor.component";
import NutritionTrackerRoute from "./routes/signed-out/nutrition-tracker/nutrition-tracker.component";
import CaloriesBurnedRoute from "./routes/signed-out/calories-burned/calories-burned.component"
import RecipesRoute from "./routes/shared/recipes/recipes.component";

import NutritionTrackerRouteSignedIn from "./routes/signed-in/nutrition-tracker/nutrition-tracker.component";
import CaloriesBurnedRouteSignedIn from "./routes/signed-in/calories-burned/calories-burned.component"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <HomeRoute/> }/>
        <Route path="nutrient-predictor" element={ <NutrientPredictorRoute/> }/>
        <Route path="nutrition-tracker" element={ <NutritionTrackerRoute/> }/>
        <Route path="recipes" element={ <RecipesRoute/> }/>
        <Route path="calories-burned" index element={ <CaloriesBurnedRoute/> }/>
        <Route path="auth" index element={ <AuthenticationRoute/> }/>

        <Route path="nutrition-tracker-signed-in" element={ <NutritionTrackerRouteSignedIn/> }/>
        <Route path="calories-burned-signed-in" element={ <CaloriesBurnedRouteSignedIn/> }/>
      </Route>
    </Routes>
  );
};

export default App;
