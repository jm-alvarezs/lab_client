import React from "react";
import moment from "moment";
import { isValidFlanker } from "../../functions/flanker";

const EstimuloFlankerCard = ({ estimulo, prevEstimulo, right, left }) => {
  return (
    <div className="row py-2 my-2">
      <div className="col-2">{estimulo.type}</div>
      <div className="col-2">
        <i
          className={`fas fa-arrow-${
            estimulo.position === "top" ? "up" : "down"
          }`}
        ></i>
      </div>
      <div className="col-1">
        {estimulo.direction === "right" ? right : left}
      </div>
      <div className="col-2">
        {estimulo.char && String(estimulo.char).toUpperCase()}
      </div>
      <div className="col-2">
        {estimulo.clicked ? (
          moment(estimulo.clicked).diff(estimulo.emitted, "miliseconds")
        ) : (
          <i className="fa fa-times"></i>
        )}
      </div>
      <div className="col-2">
        {prevEstimulo !== null &&
          prevEstimulo.clicked &&
          moment(estimulo.emitted).diff(prevEstimulo.clicked, "milliseconds")}
      </div>
      <div className="col-1">
        {isValidFlanker(estimulo, right, left) ? (
          <i className="fa fa-check text-success"></i>
        ) : (
          <i className="fa fa-times text-danger"></i>
        )}
      </div>
    </div>
  );
};

export default EstimuloFlankerCard;
