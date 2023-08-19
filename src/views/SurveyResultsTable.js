import React, { useEffect, useContext } from "react";
import { SurveyContext } from "../context/SurveyContext";
import ResultsTable from "../components/resultados/ResultsTable";

const SurveyResultsTable = () => {
  const { surveys, getSurveys } = useContext(SurveyContext);

  useEffect(() => {
    getSurveys();
  }, []);

  return <ResultsTable results={surveys} />;
};

export default SurveyResultsTable;
