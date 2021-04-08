import moment from "moment";
import React from "react";
import { getTargetResult } from "../../utils";

const EstimuloRow = ({ target, objective, type }) => {
  return (
    <div key={target.timestamp} className="border-top border-bottom my-3 py-3">
      <div className="row">
        <div className="col col-md-2">
          {moment(target.timestamp).format("HH:mm:ss:SSS")}
        </div>
        {String(type).includes("condicional") ? (
          <>
            <div className="col col-md-1">{target.prevTarget}</div>
            <div className="col col-md-1">{target.target}</div>
          </>
        ) : (
          <div className="col col-md-2">{target.target}</div>
        )}

        <div className="col col-md-2">
          {target.clicked && target.clicked !== null
            ? moment(target.clicked).format("HH:mm:ss:SSS")
            : ""}
        </div>
        <div className="col col-md-2">
          {target.clicked && target.clicked !== null
            ? moment(target.clicked).diff(
                moment(target.timestamp),
                "milliseconds"
              )
            : "N/D"}
        </div>
        <div className="col col-md-2">
          {getTargetResult(target, objective) ? (
            <i className="fa fa-check text-success"></i>
          ) : (
            <i className="fa fa-times text-danger"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimuloRow;
