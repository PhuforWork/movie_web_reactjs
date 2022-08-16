import React, { Component } from "react";
import Slider from "react-slick";
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

export default class MultipleRows extends Component {
  renderFilms = () => {
    return this.props.movieInfo.map((ele, index) => {
      return (
        <div key={index} className={`${styleSlick["width-item"]}`}>
          <Film props={ele} />
        </div>
      );
    });
  };

  render() {
    const settings = {
      className: "center slider variable-width",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 700,
      rows: 2,
      slidesPerRow: 1,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <Slider {...settings}>
        {this.renderFilms()}
      </Slider>
    );
  }
}
