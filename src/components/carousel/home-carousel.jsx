import { Carousel } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const contentStyle = {
  height: "900px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",

};

export default function HomeCarousel() {
  const banner = useSelector((state) => state.carouselReducer);
  console.log(banner.carouselBnr);
  const renderCarousel = () => {
    return banner.carouselBnr.map((ele,index) => {
      return (
        <div key={index}>
          <div style={{...contentStyle, backgroundImage:`url(${ele.hinhAnh})`}}>
            <img
              className="w-full opacity-0"
              src={ele.hinhAnh}
              alt={index}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <Carousel autoplay>
      {renderCarousel()}
    </Carousel>
  );
}
