import { Fragment, useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import "./navigation.styles.scss";

import { UserContext } from "../../../contexts/shared/user/user.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

import { NutritionTrackerContext } from "../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";
import { CaloriesBurnedContext } from "../../../contexts/signed-in/calories-burned/calories-burned.context";

const Navigation = () => {
  const [color, changeColor] = useState("white");
  document.body.style.backgroundColor = color;

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { updateNutritionTrackedDaysAndSummary } = useContext(NutritionTrackerContext);
  const { updateTrackedCaloriesBurned } = useContext(CaloriesBurnedContext)

  const linearGradient = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1)), url("https://cdn.osxdaily.com/wp-content/uploads/2015/05/Green-Grass-Fields-Wallpaper-1931.jpg")`;

  const handleSignOut = () => {
    updateNutritionTrackedDaysAndSummary();
    updateTrackedCaloriesBurned()
    signOutUser();
    navigate("/auth");
  };

  const changeStyle = (backgroundImage, color) => {
    changeColor(color);
    document.body.style.backgroundImage = backgroundImage;
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo" to="/"
          // onClick={ () => changeColor("#00150d") }
          >
          <h1>nutri-sight</h1>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/dashboard"
            // onClick={ () => changeStyle("none", "white") }
            >
            Dashboard
          </Link>

          <Link className="nav-link" to="/nutrient-predictor"
            // onClick={ () => changeStyle("none", "white") }
            >
            Nutrient Predictor
          </Link>

          {
            currentUser ? (
              <Fragment>
                <Link className="nav-link" to="/nutrition-tracker-signed-in"
                  // onClick={ () => changeStyle("none", "white") }
                  >
                  Nutrition Tracker
                </Link>

                <Link className="nav-link" to="/calories-burned-signed-in"
                  // onClick={ () => changeStyle("none", "white") }
                  >
                  Calories Burned
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link className="nav-link" to="/nutrition-tracker"
                  // onClick={ () => changeStyle("none", "white") }
                  >
                  Nutrition Tracker
                </Link>
                <Link className="nav-link" to="/calories-burned"
                  // onClick={ () => changeStyle("none", "white") }
                  >
                  Calories Burned
                </Link>
              </Fragment>
            )
          }

          <Link className="nav-link" to="/recipes"
            // onClick={ () => changeStyle("none", "white") }
            >
            Recipes
          </Link>
            
          {
            currentUser ? (
              <span className="nav-link" onClick={ handleSignOut }>Sign Out</span>
            ) : (
            <Link className="nav-link" to="/auth"
              // onClick={ () => changeStyle("none", "white") }
              >
              Login
            </Link>
            )
          }

        </div>
      </div>

      <Outlet/>
    </Fragment>
  );
};

export default Navigation;