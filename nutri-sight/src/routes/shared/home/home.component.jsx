import { Outlet } from "react-router-dom";

import Home from "../../../components/shared/home/home.component";

import "./home.styles.scss";

const HomeRoute = () => {
  return (
    <div className="home-route-container">
      <Home></Home>
    </div>
  );
};

export default HomeRoute;