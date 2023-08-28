import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import AuthenticationRoute from "./routes/authentication/authentication.component";
import NutritionTrackerRoute from "./routes/nutrition-tracker/nutrition-tracker.component";
import StoreRoute from "./routes/store/store.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <HomeRoute/> }/>
        <Route path="nutrition-tracker" element={ <NutritionTrackerRoute/> }/>
        <Route path="store" index element={ <StoreRoute/> }/>
        <Route path="auth" index element={ <AuthenticationRoute/> }/>
      </Route>
    </Routes>
  );
};

export default App;
