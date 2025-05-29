import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Subscription from "../Pages/Dashboard/Subscription";
import Profile from "../Pages/Dashboard/Profile";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import AboutUs from "../Pages/Dashboard/settings/AboutUs";
import PrivacyPolicy from "../Pages/Dashboard/settings/PrivacyPolicy";
import TermsAndConditions from "../Pages/Dashboard/settings/TermsAndCondition";
import Login from "../Pages/Auth/Login";
import FAQ from "../Pages/Dashboard/FAQ";
import Services from "../Pages/Dashboard/Services";
import Bookings from "../Pages/Dashboard/Bookings";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Main /></ProtectedRoute> ,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/subscriptions",
        element: <Subscription />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/settings/about-us",
        element: <AboutUs />,
      },
      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/settings/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/settings/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/settings/profile",
        element: <Profile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
