import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import AdminLayout from "../layouts/admin";
import PersonalInformation from "../pages/personalInformation/personal-information";

const Edituser = lazy(() =>
  import("../pages/adminLayout/dashboard/edituser/edituser")
);
const DashboardManager = lazy(() =>
  import("../pages/adminLayout/dashboard/dashboard")
);
const EditFilms = lazy(() =>
  import("../pages/adminLayout/films/editfilms/editfilms")
);
const FilmsManager = lazy(() => import("../pages/adminLayout/films/films"));
const ShowtimeManager = lazy(() =>
  import("../pages/adminLayout/showtime/showtime")
);
const Register = lazy(() => import("../pages/register/register"));
const Adduser = lazy(() =>
  import("../pages/adminLayout/dashboard/adduser/adduser")
);
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
        {
          path: "/personalinformation/",
          element: <PersonalInformation />,
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
          path: "/admin/showtime/:id/:tenphim",
          element: <ShowtimeManager />,
        },
        {
          path: "/admin/adduser",
          element: <Adduser />,
        },
        {
          path: "/admin/edituser/:taiKhoan",
          element: <Edituser />,
        },
      ],
    },
  ]);
  return routing;
}
