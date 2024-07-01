import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Game = lazy(() => import("./dashboard/Game"));
const Admin = lazy(() => import("./admin/Index"));
import UpdatePage from "./dashboard/update";
import MenuLoader from "../utils/menuLoader";
const Content = (prop) => {
  const dayOfWeekDigit = new Date().getDay();
  const siteInfo = prop.siteInfo;
  return (
    <>
      <section id="content_section">
        <section
          className="banner-area banner-bg"
          style={{ backgroundImage: "url(/assets/img/banner/banner_bg.png)" }}
        >
          {siteInfo?.shutdown ? (
            <>
              <Routes>
                <Route
                  path="/logout"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Dashboard {...prop} />
                    </Suspense>
                  }
                />
                <Route
                  path="/login/:u/:p"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Dashboard {...prop} />
                    </Suspense>
                  }
                />
                <Route
                  path="/requests"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Admin request={true} {...prop} />
                    </Suspense>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Admin {...prop} />
                    </Suspense>
                  }
                />
              </Routes>
              <UpdatePage
                loginToken={prop.loginToken}
                siteInfo={prop.siteInfo}
                openPanel={prop.openPanel}
              />
            </>
          ) : (
            <>
              <Routes>
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Dashboard {...prop} />
                    </Suspense>
                  }
                />
                <Route
                  path="/logout"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Dashboard {...prop} />
                    </Suspense>
                  }
                />
                <Route
                  path="/login/:u/:p"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Dashboard {...prop} />
                    </Suspense>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Admin {...prop} />
                    </Suspense>
                  }
                />

                <Route
                  path="/admin/:username"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Admin {...prop} />
                    </Suspense>
                  }
                />
                <Route
                  path="/requests"
                  element={
                    <Suspense fallback={<MenuLoader />}>
                      <Admin request={true} {...prop} />
                    </Suspense>
                  }
                />
                <Route path="/games">
                  <Route
                    path=":gameId"
                    element={
                      <Suspense fallback={<MenuLoader />}>
                        <Game {...prop} />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default Content;
