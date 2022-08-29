import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import AdminLayout from "../layouts/admin";
import DashboardManager from "../pages/adminLayout/dashboard/dashboard";
import EditFilms from "../pages/adminLayout/films/editfilms/editfilms";

import FilmsManager from "../pages/adminLayout/films/films";
import ShowtimeManager from "../pages/adminLayout/showtime/showtime";
import Register from "../pages/register/register";

const AddFilms = lazy(() =>
  import("../pages/adminLayout/films/addfilms/addfilms")
);
const Booking = lazy(() => import("../pages/booking/booking"));
const HomeLayout = lazy(() => import("../layouts/home"));
const Contact = lazy(() => import("../pages/contact/contact"));
const Details = lazy(() => import("../pages/details/details"));
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/login/login"));
const News = lazy(() => import("../pages/news/news"));
// const Register = lazy(() => import("../pages/register/register"));
const AdminGuards = lazy(() => import("../guards/admin.guards"));

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
        {
          path: "/booking/:id",
          element: <Booking />,
        },
      ],
    },
    {
      path: "/adminguards",
      element: <AdminGuards />,
      children: [
        {
          path: "/adminguards/login",
          element: <Login />,
        },
        {
          path: "/adminguards/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/dashboard",
          element: <DashboardManager />,
        },
        {
          path: "/admin/films",
          element: <FilmsManager />,
        },
        {
          path: "/admin/addfilms",
          element: <AddFilms />,
        },
        {
          path: "/admin/editfilms/:id",
          element: <EditFilms />,
        },
        {
          path: "/admin/showtime",
          element: <ShowtimeManager />,
        },
      ],
    },
  ]);
  return routing;
}
