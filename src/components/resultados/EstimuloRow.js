import React from "react";
import moment from "moment";

const EstimuloRow = ({ estimulo, type, index }) => {
  const renderClick = () => {
    if (estimulo.clicked && estimulo.clicked !== null) {
      return moment(estimulo.clicked).format("HH:mm:ss:SSS");
    }
  };

  const renderDifference = () => {
    if (estimulo.clicked && estimulo.clicked !== null) {
      return moment(estimulo.clicked).diff(
        moment(estimulo.timestamp),
        "milliseconds"
      );
    }
  };

  return (
    <div
      key={estimulo.timestamp}
      className="border-top border-bottom my-3 py-3"
    >
      <div className="row">
        <div className={`col col-md-${type === 3 ? "1" : "2"}`}>
          #{index + 1}
        </div>
        <div className="col col-md-2">
          {moment(estimulo.timestamp).format("HH:mm:ss:SSS")}
        </div>
        <div className="col col-md-2">{estimulo.target}</div>
        {type === 3 && <div className="col col-md-1">{estimulo.cuadrante}</div>}
        <div className="col col-md-2">{renderClick()}</div>
        <div className="col col-md-2">{renderDifference()}</div>
        <div className="col col-md-2">
          <i
            className={`fa fa-${
              estimulo.correct ? "check text-success" : "times text-danger"
            } `}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default EstimuloRow;
