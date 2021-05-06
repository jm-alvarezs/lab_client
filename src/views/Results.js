import React, { useContext, useEffect } from "react";
import { ResultadosContext } from "../context/ResultadosContext";
import ResultadoCard from "../components/resultados/ResultadoCard";

const Results = () => {
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
  };

  return (
    <div className="container">
      <h1>Resultados</h1>
      {renderResultados()}
    </div>
  );
};

export default Results;
