import moment from "moment";
import React from "react";

const StroopRow = ({ target, type, index }) => {
  return (
    <div key={target.timestamp} className="border-top border-bottom my-3 py-3">
      <div className="row">
        {type === 3 ? (
          <div className="col">#{index + 1}</div>
        ) : (
          <div className="col">#{index + 1}</div>
        )}
        <div className="col text-capitalize">{target.target}</div>
        <div className="col text-capitalize">{target.display}</div>
        <div className="col text-capitalize">{target.clicked}</div>
        <div className="col text-capitalize">{target.type}</div>
        <div className="col">
          {moment(target.timestamp).diff(
            moment(target.emitted),
            "milliseconds"
          )}{" "}
          ms
        </div>
      </div>
    </div>
  );
};

export default StroopRow;
