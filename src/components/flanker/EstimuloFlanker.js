import React from "react";

export const EstimuloFlanker = ({ type, direction, style }) => {
  const getDirection = () => {
    return type === "congruent"
      ? direction
      : direction === "left"
      ? "right"
      : "left";
  };

  return (
    <div className="container-fluid px-0 text-center">
      <i
        className={`fas fa-long-arrow-alt-${getDirection()} mx-1`}
        style={style}
      ></i>
      <i
        className={`fas fa-long-arrow-alt-${getDirection()} mx-1`}
        style={style}
      ></i>
      <i
        className={`fas fa-long-arrow-alt-${direction} mx-1`}
        style={style}
      ></i>
      <i
        className={`fas fa-long-arrow-alt-${getDirection()} mx-1`}
        style={style}
      ></i>
      <i
        className={`fas fa-long-arrow-alt-${getDirection()} mx-1`}
        style={style}
      ></i>
    </div>
  );
};
