import { BrowserRouter, Route, Routes as ReactRouterRoutes } from "react-router";
import Login from "../pages/Login";
import MapPage from "../pages/MapPage";
import Intro from "../pages/Intro";
import Home from "../pages/Home";
import Game from "../pages/Game";

function Routes() {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="intro" element={<Intro />} />
        <Route path="map" element={<MapPage />} />
        <Route path="game" element={<Game />} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}

export default Routes;
