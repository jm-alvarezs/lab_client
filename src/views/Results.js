import React, { useContext, useEffect, useState } from "react";
import Buscador from "../components/resultados/Buscador";
import { ResultadosContext } from "../context/ResultadosContext";
import SurveyResultsTable from "./SurveyResultsTable";
import TestResultsTable from "./TestResultsTable";
import { navigate } from "@reach/router";
import { Router } from "@reach/router";

const Results = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { clearSingleResultado } = useContext(ResultadosContext);

  useEffect(() => {
    clearSingleResultado();
  }, []);

  const renderFiltros = () => {
    if (showFilters) {
      return (
        <div className="row my-4">
          <Buscador survey={window.location.pathname.includes("surveys")} />
        </div>
      );
    }
  };

  return (
    <div className="container pt-3">
      <div className="row align-items-center border-bottom pb-3 mb-3">
        <div className="col-md-6">
          <h1 className="mb-0">Resultados</h1>
        </div>
        <div className="col-md-6 text-end">
          <button
            className="btn btn-primary shadow-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fa fa-filter"></i> Filtros
          </button>
        </div>
      </div>
      <div className="row align-items-center br p-2 mb-2 bg-white border">
        <div
          className={
            (window.location.pathname === "/results"
              ? "btn btn-primary "
              : "") + "col-6 br text-center tab"
          }
          onClick={() => navigate("/results")}
        >
          Pruebas
        </div>
        <div
          className={
            (window.location.pathname.includes("surveys")
              ? "btn btn-primary "
              : "") + "col-6 br text-center tab"
          }
          onClick={() => navigate("/results/surveys")}
        >
          Cuestionarios
        </div>
      </div>
      {renderFiltros()}
      <Router>
        <TestResultsTable path="/" default />
        <SurveyResultsTable path="/surveys" />
      </Router>
    </div>
  );
};

export default Results;
