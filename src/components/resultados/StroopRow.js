import React from "react";

const StroopRow = ({ target, index }) => {
  return (
    <div key={target.timestamp} className="border-top border-bottom my-3 py-3">
      <div className="row">
        <div className="col">#{index + 1}</div>
        <div className="col text-capitalize">{target.target}</div>
        <div className="col text-capitalize">{target.display}</div>
        <div className="col text-capitalize">{target.clicked}</div>
        <div className="col text-capitalize">{target.type}</div>
        <div className="col">{target.reaction} ms</div>
        <div className="col">
          <i
            className={`fa fa-${
              target.correct ? "check text-success" : "times text-danger"
            } text-success`}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default StroopRow;
