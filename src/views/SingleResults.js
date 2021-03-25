import React, { useContext, useEffect } from "react";
import PruebaConfig from "../components/PruebaConfig";
import { ResultadosContext } from "../context/ResultadosContext";
import moment from "moment";

const SingleResults = ({ id }) => {
  const { resultado, getSingleTest } = useContext(ResultadosContext);

  useEffect(() => {
    getSingleTest(id);
  }, []);

  const renderConfig = () => {
    if (resultado && resultado !== null) {
      if (resultado.settings && resultado.settings !== null) {
        return <PruebaConfig prueba={resultado.settings} />;
      }
    }
  };

  const renderEstimulos = () => {
    if (resultado.targets && resultado.targets !== null) {
      return resultado.targets.map((resultado) => (
        <div
          key={resultado.timestamp}
          className="border-top border-bottom my-3 py-3"
        >
          <div className="row">
            <div className="col col-md-3">
              {moment(resultado.timestamp).format("HH:mm:ss")}
            </div>
            <div className="col col-md-3">{resultado.character}</div>
            <div className="col col-md-3">
              {resultado.clicked !== null
                ? moment(resultado.clicked).format("HH:mm:ss")
                : ""}
            </div>
            <div className="col col-md-3"></div>
          </div>
        </div>
      ));
    }
  };

  const renderResults = () => {
    if (resultado && resultado !== null) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-6"></div>
            <div className="col col-md-6">
              <h3>Estímulos</h3>
              {renderEstimulos()}
            </div>
          </div>
        </div>
      );
    }
  };

  const renderSujeto = () => {
    if (resultado && resultado !== null) {
      const { patient } = resultado;
      const { name, email, birthDate } = patient;
      return (
        <div>
          <h4>{name}</h4>
          <p>{email}</p>
          <p>Fecha de Nacimiento: {moment(birthDate).format("DD MMM YYYY")}</p>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="card shadow-sm p-3 my-2">
        <h1 className="border-bottom pb-3 mb-3">Resultados</h1>
        {renderResults()}
      </div>
      <div className="row">
        <div className="col col-md-6">
          <div className="card shadow-sm p-3 my-2">{renderConfig()}</div>
        </div>
        <div className="col col-md-6">
          <div className="card shadow-sm p-3 my-2">
            <h3 className="pb-3 mb-3 border-bottom">Sujeto</h3>
            {renderSujeto()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResults;
