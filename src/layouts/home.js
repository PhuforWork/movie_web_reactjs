import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HomeCarousel from "../components/carousel/home-carousel";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

export default function HomeLayout() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
