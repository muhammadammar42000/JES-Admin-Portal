import "./App.scss";
import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import "../node_modules/react-image-gallery/styles/css/image-gallery.css";

//react swiper
import "../node_modules/swiper/swiper-bundle.min.css";
import { toast, ToastContainer } from "react-toastify";

//Pages

const Home = lazy(() => import("./pages/Home/Home"));
const Event = lazy(() => import("./pages/Event/Event"));
const AboutUS = lazy(() => import("./pages/About US/AboutUs"));
const Activities = lazy(() => import("./pages/Activities/Activities"));
const Banner = lazy(() => import("./pages/Banner/Banner"));
const Location = lazy(() => import("./pages/Location/Location"));
const PrivacyPolicy = lazy(() =>
  import("./pages/Privacy Policy/PrivacyPolicy")
);
const Report = lazy(() => import("./pages/Reports/Reports"));
const RegisteredUser = lazy(() =>
  import("./pages/Registered Users/RegisteredUsers")
);
const EventDetail = lazy(() =>
  import("./pages/Event/EventDetailPage/EventDetail")
);

const LocationDetailPage = lazy(() =>
  import("./pages/Location/LocationDetailPage/LocationDetailPage")
);

const ActivitiesDetailPage = lazy(() =>
  import("./pages/Activities/ActivitiesDetailPage/ActivitiesDetailPage")
);

const LoginPage = lazy(() => import("./pages/Login/Login"));

const MainLocation = lazy(() => import("./pages/MainLocation/MainLocation"));

function App() {
  const isLogged = localStorage.getItem("isLogged");

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Suspense fallback={<p>LOADING...</p>}>
          <Routes>
            <Route element={<PrivateRoutes isLogged={isLogged} />}>
              <Route path="/" element={<Home />} />
              <Route path="/event" element={<Event />} />
              <Route path="/aboutus" element={<AboutUS />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/banner" element={<Banner />} />
              <Route path="/location" element={<Location />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/reports" element={<Report />} />
              <Route path="/regestered-users" element={<RegisteredUser />} />
              <Route path="/eventdetail" element={<EventDetail />} />
              <Route path="/locationdetail" element={<LocationDetailPage />} />
              <Route path="/mainlocation" element={<MainLocation />} />
              <Route
                path="/activitiesdetail"
                element={<ActivitiesDetailPage />}
              />
            </Route>
            {isLogged !== "true" && (
              <Route path="/login" element={<LoginPage />} />
            )}
            <Route
              path="*"
              element={
                isLogged === "true" ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
