import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/shared/home/home.component";
import Navigation from "./routes/shared/navigation/navigation.component";
import AuthenticationRoute from "./routes/signed-out/authentication/authentication.component";
import NutritionTrackerRoute from "./routes/signed-out/nutrition-tracker/nutrition-tracker.component";
import StoreRoute from "./routes/shared/store/store.component";
import RecipesRoute from "./routes/shared/recipes/recipes.component";

import NutritionTrackerRouteSignedIn from "./routes/signed-in/nutrition-tracker/nutrition-tracker.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <HomeRoute/> }/>
        <Route path="nutrition-tracker" element={ <NutritionTrackerRoute/> }/>
        <Route path="recipes" element={ <RecipesRoute/> }/>
        <Route path="store" index element={ <StoreRoute/> }/>
        <Route path="auth" index element={ <AuthenticationRoute/> }/>

        <Route path="nutrition-tracker-signed-in" element={ <NutritionTrackerRouteSignedIn/> }/>
      </Route>
    </Routes>
  );
};

export default App;
