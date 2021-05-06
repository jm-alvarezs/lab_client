import React, { useContext, useEffect, useState } from "react";
import { ResultadosContext } from "../context/ResultadosContext";
import ResultadoCard from "../components/resultados/ResultadoCard";
import Buscador from "./Buscador";

const Results = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { resultados, getResultados } = useContext(ResultadosContext);

  useEffect(() => {
    getResultados();
  }, []);

  const renderResultados = () => {
    if (resultados && resultados !== null) {
      return resultados.map((resultado) => (
        <ResultadoCard key={resultado.id} resultado={resultado} />
      ));
    }
    return <div className="spinner-border"></div>;
  };

  const renderFiltros = () => {
    if (showFilters) {
      return (
        <div className="row my-4">
          <Buscador />
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
      {renderFiltros()}
      {renderResultados()}
    </div>
  );
};

export default Results;
