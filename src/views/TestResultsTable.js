import React, { useEffect, useContext } from "react";
import ResultsTable from "../components/resultados/ResultsTable";
import { ResultadosContext } from "../context/ResultadosContext";

const TestResultsTable = () => {
  const { resultados, getResultados } = useContext(ResultadosContext);

  useEffect(() => {
    getResultados();
  }, []);

  return <ResultsTable results={resultados} />;
};

export default TestResultsTable;
