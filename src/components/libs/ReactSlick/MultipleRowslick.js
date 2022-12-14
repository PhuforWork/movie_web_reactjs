import React from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import {
  ALL_PHIM,
  SET_PHIMDANGCHIEU,
  SET_PHIMSAPCHIEU,
} from "../../../store/types/name.type";
import Film from "../../film/film";
import styleSlick from "./MultipleRowslick.module.css";



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block", right: "-50px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    />
  );
}

export default function MultipleRows(props) {
  const dispatch = useDispatch();
  const renderFilms = () => {
    return props.movieInfo.map((ele, index) => {
      return (
        <div key={index} className={`${styleSlick["width-item"]}`}>
          <Film item={ele} />
        </div>
      );
    });
  };
  const settings = {
    className: "center slider variable-width",
    centerMode: true,
    // infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 1000,
    rows: 2,
    slidesPerRow: 1,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <button
        type="button"
        className={` relative px-8 py-2 ml-4 overflow-hidden focus:bg-lime-500  font-semibold rounded bg-gray-500 dark:text-gray-900`}
        onClick={() => {
          dispatch({
            type: ALL_PHIM,
          });
        }}
      >
        ALL
      </button>
      <button
        type="button"
        className={` relative px-10 py-2  focus:bg-lime-500 ml-2  overflow-hidden font-semibold rounded bg-gray-500 dark:text-gray-900`}
        onClick={() => {
          dispatch({
            type: SET_PHIMSAPCHIEU,
          });
        }}
      >
        PHIM S???P CHI???U
        <span className="absolute top-0 right-0 px-3  text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-violet-400">
          New
        </span>
      </button>
      <button
        type="button"
        className={` relative px-8 py-2 ml-2 overflow-hidden focus:bg-lime-500 font-semibold rounded bg-gray-500 dark:text-gray-900`}
        onClick={() => {
          dispatch({
            type: SET_PHIMDANGCHIEU,
          });
        }}
      >
        PHIM ??ANG CHI???U
      </button>
      <div>
        <Slider {...settings}>{renderFilms()}</Slider>
      </div>
    </>
  );
}
