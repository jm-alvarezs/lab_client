import React, { useContext, useEffect } from "react";
import moment from "moment";
import { ResultadosContext } from "../context/ResultadosContext";
import { Link } from "@reach/router";

const Results = () => {
  const { resultados, getResultados } = useContext(ResultadosContext);

  useEffect(() => {
    getResultados();
  }, []);

  const renderResultados = () => {
    if (resultados && resultados !== null) {
      return resultados.map((resultado) => (
        <div key={resultado.id} className="card my-2 p-3 shadow-sm">
          <div className="row">
            <div className="col col-md-6">
              <p>{moment(resultado.createdAt).format("DD MMM YYYY HH:mm")}</p>
            </div>
            <div className="col col-md-6 text-right">
              <Link
                to={`./${resultado.id}`}
                className="btn btn-outline-secondary"
              >
                <i className="fa fa-eye"></i> Consultar
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
