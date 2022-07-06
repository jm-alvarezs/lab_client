import React from "react";

const SurveyConfigCard = ({ survey }) => {
  return (
    <div className="card p-3 shadow-sm my-3">
      <h4>{survey.surveyType.name}</h4>
    </div>
  );
};

export default SurveyConfigCard;
