import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo" to="/">
          <h1>nutri-sight</h1>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/nutrient-predictor">
            Nutrient Predictor
          </Link>

          <Link className="nav-link" to="/nutrition-tracker">
            Nutrition Tracker
          </Link>

          <Link className="nav-link" to="/recipes">
            Recipes
          </Link>

          <Link className="nav-link" to="/store">
            Store
          </Link>

          <Link className="nav-link" to="/auth">
            Login
          </Link>
        </div>
      </div>

      <Outlet/>
    </Fragment>
  );
};

export default Navigation;