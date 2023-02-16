import React from "react";
import PruebasService from "../../services/PruebasService";
import { S3_ENDOINT } from "../../utils";

const TestConfigCard = ({ test, handleShowSettings, handleInfo }) => {
  const getSrc = () => {
    const { testType } = test;
    if (testType !== null) {
      const { thumbnail } = testType;
      if (thumbnail !== null) {
        return `${S3_ENDOINT}/${thumbnail.name}.${thumbnail.type}`;
      }
    }
    return "";
  };

  const handleSettings = () => {
    PruebasService.getPrueba(test.id).then((res) => {
      const { settings } = res.data.data;
      if (settings) {
        handleShowSettings(test.testType, settings);
      }
    });
  };

  const src = getSrc();

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card p-3 shadow-sm my-3">
        <img src={src} className="card-img" />
        <div className="row align-items-center py-3">
          <div className="col-10">
            <h4>{test.testType.name}</h4>
            <p className="text-muted mb-0">{test.testType.author}</p>
          </div>
          <div className="col-2 text-end">
            <button className="btn btn-light border" onClick={handleSettings}>
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConfigCard;
