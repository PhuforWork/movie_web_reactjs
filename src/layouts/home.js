import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/footer/footer";
import Header from "../components/header/header";

export default function HomeLayout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
