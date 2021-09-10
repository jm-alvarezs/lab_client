import React, { useContext, useEffect, useState } from "react";
import { ResultadosContext } from "../context/ResultadosContext";
import ResultadoCard from "../components/resultados/ResultadoCard";
import Buscador from "../components/resultados/Buscador";
import { SurveyContext } from "../context/SurveyContext";

const Results = ({ admin }) => {
  const [tab, setTab] = useState("pruebas");
  const [showFilters, setShowFilters] = useState(false);
  const { resultados, getResultados, getResultadosAdmin } =
    useContext(ResultadosContext);

  const { surveys, getSurveys, getSurveysAdmin } = useContext(SurveyContext);

  useEffect(() => {
    if (tab === "pruebas") {
      if (admin) {
        getResultadosAdmin();
      } else {
        getResultados();
      }
    } else {
      if (admin) {
        getSurveysAdmin();
      } else {
        getSurveys();
      }
    }
  }, [tab]);

  const renderResultados = () => {
    if (tab === "pruebas") {
      if (resultados && resultados !== null) {
        if (resultados.length === 0) {
          return (
            <div className="row">
              <p>No hay resultados registrados.</p>
            </div>
          );
        }
        return resultados.map((resultado) => (
          <ResultadoCard key={resultado.id} resultado={resultado} />
        ));
      }
    } else {
      if (surveys && surveys !== null) {
        if (surveys.length === 0) {
          return (
            <div className="row">
              <p>No hay cuestionarios registrados.</p>
            </div>
          );
        }
        return surveys.map((resultado) => (
          <ResultadoCard key={resultado.id} resultado={resultado} />
        ));
      }
    }
    return <div className="spinner-border"></div>;
  };

  const renderFiltros = () => {
    if (showFilters) {
      return (
        <div className="row my-4">
          <Buscador survey={tab === "cuestionarios"} />
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="row border-bottom pb-3 mb-3">
        <div className="col-md-6">
          <h1>Resultados</h1>
        </div>
        <div className="col-md-6 text-right">
          <button
            className="btn btn-light shadow-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fa fa-filter"></i> Filtros
          </button>
        </div>
      </div>
      <div className="row">
        <div
          className={
            (tab === "pruebas" ? "selected " : "") + "col-6 text-center tab"
          }
          onClick={() => setTab("pruebas")}
        >
          Pruebas
        </div>
        <div
          className={
            (tab === "cuestionarios" ? "selected " : "") +
            "col-6 text-center tab"
          }
          onClick={() => setTab("cuestionarios")}
        >
          Cuestionarios
        </div>
      </div>
      {renderFiltros()}
      {renderResultados()}
    </div>
  );
};

export default Results;
