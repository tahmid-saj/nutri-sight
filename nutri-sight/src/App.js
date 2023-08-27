import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import NutritionTracker from "./routes/nutrition-tracker/nutrition-tracker.component";
import Store from "./routes/store/store.component";
import AuthenticationRoute from "./routes/authentication/authentication.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <HomeRoute/> }/>
        <Route path="nutrition-tracker" element={ <NutritionTracker/> }/>
        <Route path="store" index element={ <Store/> }/>
        <Route path="auth" index element={ <AuthenticationRoute/> }/>
      </Route>
    </Routes>
  );
};

export default App;
