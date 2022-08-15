import React, { Component } from "react";
import Slider from "react-slick";
import Film from "../../film/film";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey", right: "-50px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey", left: "-50px" }}
      onClick={onClick}
    />
  );
}

export default class MultipleRows extends Component {
  renderFilms = () => {
    return this.props.movieInfo.map((ele, index) => {
      return (
        <div key={index} style={{width:"400px", padding:"1rem 1rem"}}>
          <Film props={ele} />
        </div>
      );
    });
  };

  render() {
    const settings = {
      className: "center variable-width",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 2,
      speed: 500,
      rows: 2,
      slidesPerRow: 1,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>{this.renderFilms()}</div>
          <div>{this.renderFilms()}</div>
          <div>{this.renderFilms()}</div>
          <div>{this.renderFilms()}</div>
          <div>{this.renderFilms()}</div>
          <div>{this.renderFilms()}</div>
          <div>{this.renderFilms()}</div>
          <div>{this.renderFilms()}</div>

        </Slider>
      </div>
    );
  }
}
