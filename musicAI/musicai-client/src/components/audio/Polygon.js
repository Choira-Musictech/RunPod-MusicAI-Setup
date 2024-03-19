
import PropTypes from "prop-types";
import React from "react";
import "../../assets/styles/homepage.css";

export const Polygon = ({
  property1,
  style,
  polygonStyle,
  polygon = "https://generation-sessions.s3.amazonaws.com/119ae9385ad58f5d1ad59ac24765c1ee/img/polygon-1-9.svg",
  img = "https://generation-sessions.s3.amazonaws.com/119ae9385ad58f5d1ad59ac24765c1ee/img/polygon-1-8.svg",
}) => {
  return (
    <div className="polygon" style={style}>
      <img
        className="img"
        style={polygonStyle}
        alt="Polygon"
        src={
          property1 === "variant-2"
            ? img
            : property1 === "variant-3"
            ? "https://generation-sessions.s3.amazonaws.com/119ae9385ad58f5d1ad59ac24765c1ee/img/polygon-1-7.svg"
            : property1 === "variant-4"
            ? "https://generation-sessions.s3.amazonaws.com/119ae9385ad58f5d1ad59ac24765c1ee/img/polygon-1-6.svg"
            : polygon
        }
      />
    </div>
  );
};

Polygon.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
  polygon: PropTypes.string,
  img: PropTypes.string,
};
