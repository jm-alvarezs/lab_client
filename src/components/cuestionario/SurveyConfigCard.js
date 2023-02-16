import React from "react";
import { S3_ENDOINT } from "../../utils";

const SurveyConfigCard = ({ survey, handleShowSettings }) => {
  const getSrc = () => {
    const { surveyType } = survey;
    if (surveyType !== null) {
      const { thumbnail } = surveyType;
      if (thumbnail !== null) {
        return `${S3_ENDOINT}/${thumbnail.name}.${thumbnail.type}`;
      }
    }
    return "";
  };

  const handleSettings = () => {
    handleShowSettings(survey.surveyType, null);
  };

  const src = getSrc();

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card p-3 shadow-sm my-3">
        <img src={src} className="card-img" />
        <div className="row align-items-center py-3">
          <div className="col-10">
            <h4>{survey.surveyType.name}</h4>
            <p className="text-muted mb-0">{survey.surveyType.author}</p>
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

export default SurveyConfigCard;
