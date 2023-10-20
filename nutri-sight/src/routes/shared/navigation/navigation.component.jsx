import { Fragment, useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import "./navigation.styles.scss";

import { UserContext } from "../../../context/shared/user/user.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

const Navigation = () => {
  const [color, changeColor] = useState("white");
  document.body.style.backgroundColor = color;

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser();
    navigate("/auth");
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo" to="/"
          onClick={ () => changeColor("#00150d") }>
          <h1>nutri-sight</h1>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/nutrient-predictor"
            onClick={ () => changeColor("white") }>
            Nutrient Predictor
          </Link>

          {
            currentUser ? (
              <Link className="nav-link" to="/nutrition-tracker-signed-in"
                onClick={ () => changeColor("white") }>
                Nutrition Tracker
              </Link>
            ) : (
              <Link className="nav-link" to="/nutrition-tracker"
                onClick={ () => changeColor("white") }>
                Nutrition Tracker
              </Link>
            )
          }

          <Link className="nav-link" to="/recipes"
            onClick={ () => changeColor("white") }>
            Recipes
          </Link>

          <Link className="nav-link" to="/store"
            onClick={ () => changeColor("white") }>
            Store
          </Link>
            
          {
            currentUser ? (
              <span className="nav-link" onClick={ handleSignOut }>Sign Out</span>
            ) : (
            <Link className="nav-link" to="/auth"
              onClick={ () => changeColor("white") }>
              Login
            </Link>
            )
          }

        </div>
      </div>

      <Outlet/>
    </Fragment>

  //   <Fragment>
  //   <div className="navigation">
  //     <Link className="logo" to="/">
  //       <h1>nutri-sight</h1>
  //     </Link>

  //     <div className="nav-links-container">
  //       <Link className="nav-link" to="/nutrient-predictor">
  //         Nutrient Predictor
  //       </Link>

  //       <Link className="nav-link" to="/nutrition-tracker">
  //         Nutrition Tracker
  //       </Link>

  //       <Link className="nav-link" to="/recipes">
  //         Recipes
  //       </Link>

  //       <Link className="nav-link" to="/store">
  //         Store
  //       </Link>

  //       <Link className="nav-link" to="/auth">
  //         Login
  //       </Link>
  //     </div>
  //   </div>

  //   <Outlet/>
  // </Fragment>
  );
};

export default Navigation;