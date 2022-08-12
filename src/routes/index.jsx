import React from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/home";
import Contact from "../pages/contact/contact";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import News from "../pages/news/news";
import Register from "../pages/register/register";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
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
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return routing;
}
