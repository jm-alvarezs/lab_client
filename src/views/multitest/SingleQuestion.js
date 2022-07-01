import React, { useState } from "react";

const SingleQuestion = ({ label, modifier }) => {
  const [value, setValue] = useState(null);
  return (
    <div className="row mt-2 mb-4 align-items-center">
      <div className="col-9">
        <label>{label}</label>
      </div>
      <div className="col-3">
        <div className="row">
          <div className="col-6">
            <label className="d-block">Si</label>
            <input
              type="radio"
              checked={value === 1}
              onChange={(e) => {
                if (e.target.checked) {
                  setValue(1);
                  modifier(1);
                }
              }}
            />
          </div>
          <div className="col-6">
            <label className="d-block">No</label>
            <input
              type="radio"
              checked={value === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setValue(0);
                  modifier(0);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
