import React, { useContext, useEffect, useState } from "react";
import { SurveyContext } from "../../context/SurveyContext";
import SurveyService from "../../services/SurveyService";
import AnswerCuestionario from "../AnswerCuestionario";

const SingleSurveyRun = ({
  order,
  patient,
  endCallback,
  idMultiTest,
  currentSurvey,
  testSetupCallback,
}) => {
  const [loading, setLoading] = useState(false);
  const { survey, getSurvey } = useContext(SurveyContext);

  useEffect(() => {
    if (currentSurvey && currentSurvey !== null) {
      getSurvey(currentSurvey.id, currentSurvey.accessUrl.token);
    }
  }, [currentSurvey]);

  useEffect(() => {
    if (
      !loading &&
      survey !== null &&
      survey.idPatient !== patient.id &&
      survey.survey.idPatient !== patient.id
    ) {
      setLoading(true);
      setTimeout(() => {
        surveySetup();
      }, 1000);
    } else if (survey !== null) {
      if (survey.survey.idPatient === patient.id) {
        setLoading(false);
      }
    }
  }, [survey, currentSurvey]);

  const surveySetup = () => {
    console.log(survey);
    let data = {
      ...survey.survey,
      idSurveyType: survey.type,
    };
    data.idMultiTest = idMultiTest;
    data.idPatient = patient.id;
    delete data.accessUrl;
    delete data.surveyType;
    SurveyService.postSurvey(data).then((res) => {
      testSetupCallback();
    });
  };

  const renderSurvey = () => {
    if (
      survey &&
      survey !== null &&
      currentSurvey !== null &&
      loading === false
    ) {
      return <AnswerCuestionario survey={survey} endCallback={endCallback} />;
    }
    return (
      <div className="row align-items-center vh-100">
        <div className="container-fluid text-center">
          <div className="spinner-border"></div>
          <p className="mt-3">
            Espera un momento mientras cargamos tu ejercicio.
          </p>
        </div>
      </div>
    );
  };

  return <div>{renderSurvey()}</div>;
};

export default SingleSurveyRun;
