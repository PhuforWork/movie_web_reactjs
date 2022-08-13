import { Carousel } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAsync } from "../../hooks/useAsync";
import { fetchMovieBanner } from "../../services/carousel";

const contentStyle = {
  with: "100%",
  height:"750px",
  color: "#B8ABA9 ",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel() {
  // const banner = useSelector((state) => state.carouselReducer);

  const { state: carouselBnr } = useAsync({
    dependancies: [],
    service: () => fetchMovieBanner(),
  });

  const renderCarousel = () => {
    return carouselBnr.map((ele, index) => {
      return (

          <div key={index}>
            <div
              style={{
                ...contentStyle,
                backgroundImage: `url(${ele.hinhAnh})`,
              }}
            >
              <img className="w-full opacity-0" src={ele.hinhAnh} alt={index} />
            </div>
          </div>

      );
    });
  };
  return <Carousel autoplay>{renderCarousel()}</Carousel>;
}
