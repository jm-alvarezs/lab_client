import React from "react";

const SingleQuestion = ({ label, modifier }) => {
  return (
    <div className="row my-3 align-items-center">
      <div className="col-9">
        <label>{label}</label>
      </div>
      <div className="col-3">
        <div className="row">
          <div className="col-6">
            <label className="d-block">Si</label>
            <input type="radio" />
          </div>
          <div className="col-6">
            <label className="d-block">No</label>
            <input type="radio" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
