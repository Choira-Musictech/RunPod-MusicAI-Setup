import React from "react";

import "./layout.css";
function Button({
  name,
  icon,
  onClick,
  style,
  type,
  disabled = false,
  showBtnLoader = false,
  loaderText = "loading ...",
}) {
  return (
    <>
      <button
        className={`${
          disabled || showBtnLoader ? "btndisabled" : "reuseablebtn"
        }`}
        onClick={onClick}
        style={style}
        type={type}
        disabled={disabled || showBtnLoader}
      >
        {showBtnLoader ? (
          <>
            {/* <small>{loaderText}</small> */}
            <div className="btnLoader">{loaderText}</div>
          </>
        ) : (
          <>
            <div>{icon}</div>
            <div>{name}</div>
          </>
        )}
      </button>
    </>
  );
}

export default Button;
/* HTML: <div class="loader"></div> */
