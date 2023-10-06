import { Fragment, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import "./navigation.styles.scss";

import { UserContext } from "../../../context/user.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

const Navigation = () => {
  const [color, changeColor] = useState("white");
  document.body.style.backgroundColor = color;

  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo" to="/"
          onClick={ () => changeColor("black") }>
          <h1>nutri-sight</h1>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/nutrient-predictor"
            onClick={ () => changeColor("white") }>
            Nutrient Predictor
          </Link>

          {/* {
            currentUser === null ? (
              <Fragment>
                <Link className="nav-link" to="/nutrition-tracker-signed-in"
                  onClick={ () => changeColor("white") }>
                  Nutrition Tracker
                </Link>
              </Fragment>

            ) : ( */}
              {/* <Fragment> */}
                <Link className="nav-link" to="/nutrition-tracker"
                  onClick={ () => changeColor("white") }>
                  Nutrition Tracker
                </Link>
              {/* </Fragment> */}
            {/* )
          } */}

          <Link className="nav-link" to="/recipes"
            onClick={ () => changeColor("white") }>
            Recipes
          </Link>

          <Link className="nav-link" to="/store"
            onClick={ () => changeColor("white") }>
            Store
          </Link>

          <Link className="nav-link" to="/auth"
            onClick={ () => changeColor("white") }>
            Login
          </Link>
        </div>
      </div>

      <Outlet/>
    </Fragment>
  );
};

export default Navigation;