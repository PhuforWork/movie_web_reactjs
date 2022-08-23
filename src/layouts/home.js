import React from "react";
import { Outlet } from "react-router-dom";
// import HomeCarousel from "../components/carousel/home-carousel";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
