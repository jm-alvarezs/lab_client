import React, { useContext, useEffect } from "react";
import PruebaConfig from "../components/PruebaConfig";
import { ResultadosContext } from "../context/ResultadosContext";
import moment from "moment";
import { getTargetResult } from "../utils";
import SplitHalfTesting from "./SplitHalfTesting";

const SingleResults = ({ id }) => {
  const { resultado, getSingleTest } = useContext(ResultadosContext);

  useEffect(() => {
    getSingleTest(id);
  }, []);

  const renderConfig = () => {
    if (resultado && resultado !== null) {
      if (resultado.test.settings && resultado.test.settings !== null) {
        return <PruebaConfig prueba={resultado.settings} />;
      }
    }
  };

  const renderEstimulos = () => {
    if (resultado && resultado !== null) {
      if (resultado.results.config) {
        return resultado.results.targets.map((target) => (
          <div
            key={target.timestamp}
            className="border-top border-bottom my-3 py-3"
          >
            <div className="row">
              <div className="col col-md-2">
                {moment(target.timestamp).format("HH:mm:ss")}
              </div>
              <div className="col col-md-2">{target.target}</div>
              <div className="col col-md-2">
                {target.clicked && target.clicked !== null
                  ? moment(target.clicked).format("HH:mm:ss")
                  : ""}
              </div>
              <div className="col col-md-2">
                {target.clicked && target.clicked !== null
                  ? moment(target.clicked).diff(
                      moment(target.timestamp),
                      "milliseconds"
                    )
                  : "N/D"}
              </div>
              <div className="col col-md-2">
                {getTargetResult(target, resultado.results.target) ? (
                  <i className="fa fa-check"></i>
                ) : (
                  <i className="fa fa-times"></i>
                )}
              </div>
            </div>
          </div>
        ));
      }
    }
  };

  const renderResults = () => {
    if (resultado && resultado !== null) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-6"></div>
            <div className="col col-md-6 px-0">
              <SplitHalfTesting
                items={resultado.results.targets}
                column="click"
                result=""
              />
            </div>
          </div>
        </div>
      );
    }
  };

  const renderSujeto = () => {
    if (resultado && resultado !== null) {
      const { patient } = resultado.test;
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
      <div className="card shadow-sm p-3 my-2">
        <h3>Estímulos</h3>
        <div className="row">
          <div className="col col-md-2">Emisión</div>
          <div className="col col-md-2">Caracter</div>
          <div className="col col-md-2">Click</div>
          <div className="col col-md-2">TR</div>
          <div className="col col-md-2">Resultado</div>
        </div>
        {renderEstimulos()}
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
