import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TourSite from "./toursite";

import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";

import "./public/assets/css/animate.min.css";
import "./public/assets/css/default.css";
import "./public/assets/css/bootstrap.min.css";
import "./public/assets/css/fontawesome-all.min.css";
import "./public/assets/css/style.css";
import "./public/assets/css/responsive.css";
import "./assets/css/style.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TourSite />
  </BrowserRouter>
);
