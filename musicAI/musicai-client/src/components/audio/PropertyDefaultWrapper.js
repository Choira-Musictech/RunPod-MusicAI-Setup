

import PropTypes from "prop-types";
import React from "react";
import "../../assets/styles/PropertyDefaultWrapper.css";

export const PropertyDefaultWrapper = ({
  property1,
  style,
  polygonStyle,
  polygon = "https://generation-sessions.s3.amazonaws.com/119ae9385ad58f5d1ad59ac24765c1ee/img/polygon-1.svg",
  img = "https://generation-sessions.s3.amazonaws.com/119ae9385ad58f5d1ad59ac24765c1ee/img/polygon-1-11.svg",
}) => {
  return (
    <div className="property-default-wrapper" style={style}>
      <img
        className="polygon-2"
        style={polygonStyle}
        alt="Polygon"
        src={
          property1 === "variant-2"
            ? "https://generation-sessions.s3.amazonaws.com/119ae9385ad58f5d1ad59ac24765c1ee/img/polygon-1-12.svg"
            : property1 === "variant-3"
            ? img
            : property1 === "variant-4"
            ? "https://generation-sessions.s3.amazonaws.com/119ae9385ad58f5d1ad59ac24765c1ee/img/polygon-1-10.svg"
            : polygon
        }
      />
    </div>
  );
};

PropertyDefaultWrapper.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
  polygon: PropTypes.string,
  img: PropTypes.string,
};
