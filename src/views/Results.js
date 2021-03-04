import React, { useContext, useEffect } from "react";
import moment from "moment";
import { ResultadosContext } from "../context/ResultadosContext";
import { Link } from "@reach/router";

const Results = ({ idPrueba }) => {
  const { resultados, getResultados } = useContext(ResultadosContext);

  useEffect(() => {
    getResultados();
  });

  const renderResultados = () => {
    if (resultados && resultados !== null) {
      return resultados.map((resultado) => (
        <div className="card my-2 p-3 shadow-sm">
          <div className="row">
            <div className="col col-md-6">
              <h3>{moment(resultado.createdAt).format("DD MMM YYYY")}</h3>
            </div>
            <div className="col col-md-6 text-right">
              <Link
                to={`./${resultado._id}`}
                className="btn btn-outline-primary"
              >
                Consultar
              </Link>
            </div>
          </div>
        </div>
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
