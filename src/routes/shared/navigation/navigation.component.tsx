import { Fragment, useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import "./navigation.styles.tsx";
import { DrawerContainer } from "./navigation.styles.tsx";

import { signOutUser } from "../../../utils/firebase/firebase.utils.js";
import MiniDrawer from "../../../components/shared/mui/drawer/drawer.component.tsx";

// import { UserContext } from "../../../contexts/shared/user/user.context";
import { NutritionTrackerContext } from "../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.tsx";
import { CaloriesBurnedContext } from "../../../contexts/signed-in/calories-burned/calories-burned.context.tsx";

import { NAV_LINKS } from "../../../utils/constants/shared.constants.ts";

import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../store/shared/user/user.selector.ts";
import HiddenDrawer from "../../../components/shared/mui/hidden-drawer/hidden-drawer.component.tsx";

const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser)
  
  // const { updateNutritionTrackedDaysAndSummary } = useContext(NutritionTrackerContext);
  // const { updateTrackedCaloriesBurned } = useContext(CaloriesBurnedContext)
  // const navigate = useNavigate();

  // const handleSignOut = () => {
  //   updateNutritionTrackedDaysAndSummary();
  //   updateTrackedCaloriesBurned()
  //   signOutUser();
  //   navigate("/auth");
  // };

  return (
    <Fragment>
      {/* <MiniDrawer
        navLinksHeaders={
          currentUser ? NAV_LINKS.signedIn : NAV_LINKS.signedOut
        }
      >
      </MiniDrawer> */}
      <DrawerContainer>
        <HiddenDrawer></HiddenDrawer>
      </DrawerContainer>

      {/* <div className="navigation">
        <Link className="logo" to="/"
          // onClick={ () => changeColor("#00150d") }
          >
          <h1>nutri-sight</h1>
        </Link>

        <div className="nav-links-container">
          {
            currentUser ? (
              <Link className="nav-link" to="/dashboard-signed-in"
                // onClick={ () => changeStyle("none", "white") }
                >
                Dashboard
              </Link>
            ) : (
              <Link className="nav-link" to="/dashboard"
                // onClick={ () => changeStyle("none", "white") }
                >
                Dashboard
              </Link>
            )
          }

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
      </div> */}

      <Outlet/>
    </Fragment>
  );
};

export default Navigation;