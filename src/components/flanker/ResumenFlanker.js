import moment from "moment";
import React from "react";
import {
  getErroresFlanker,
  getErroresFlankerTipo,
  getOmisionesFlanker,
  getTiempoReaccionFlanker,
} from "../../functions/flanker";
import { BASE_URL } from "../../utils";

const ResumenFlanker = ({
  toPdf,
  resultado,
  estimulos,
  startTime,
  finishTime,
  left,
  right,
}) => {
  const renderCompletada = () => {
    if (estimulos && estimulos !== null) {
      return (
        <>
          <div className="row py-2">
            <div className="col-6">Tiempo Total</div>
            <div className="col-6">
              {moment(finishTime, "YYYY-MM-DD HH:mm:ss:SSS").diff(
                moment(startTime, "YYYY-MM-DD HH:mm:ss:SSS"),
                "seconds"
              )}
              .
              {moment(finishTime, "YYYY-MM-DD HH:mm:ss:SSS").diff(
                moment(startTime, "YYYY-MM-DD HH:mm:ss:SSS"),
                "miliseconds"
              ) % 1000}{" "}
              segundos
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Tiempo medio de reacción</div>
            <div className="col-6">
              {getTiempoReaccionFlanker(estimulos)}
              {" ms"}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores Totales</div>
            <div className="col-6">
              {getErroresFlanker(estimulos, left, right)}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores de Dirección</div>
            <div className="col-6">
              {getErroresFlankerTipo(estimulos, "direction", left, right)}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Omisiones</div>
            <div className="col-6">{getOmisionesFlanker(estimulos)}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores en Congruentes</div>
            <div className="col-6">
              {getErroresFlankerTipo(estimulos, "Congruente", left, right)}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores en Incongruentes</div>
            <div className="col-6">
              {getErroresFlankerTipo(estimulos, "Incongruente", left, right)}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores en Neutrales</div>
            <div className="col-6">
              {getErroresFlankerTipo(estimulos, "Neutral", left, right)}
            </div>
          </div>
        </>
      );
    }
    return <h4 className="text-danger mt-3">Prueba Sin Realizar</h4>;
  };

  return (
    <div className="card container shadow-sm p-3 mb-4">
      <div className="row border-bottom pb-3 mb-2">
        <div className="col-6">
          <h3 className="bold">
            Prueba #{resultado !== null && resultado.test.id} - Flanker Task
          </h3>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-outline-dark mx-2" onClick={toPdf}>
            <i className="fa fa-print"></i>
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() =>
              window.open(`${BASE_URL}/reports/${resultado.test.id}`, "_blank")
            }
          >
            <i className="far fa-file-excel"></i>
          </button>
        </div>
      </div>
      <div className="row py-2">
        <div className="col-6">Prueba Completada</div>
        <div className="col-6">
          <i
            className={
              resultado.results.finished
                ? "fa fa-check text-success"
                : "fa fa-times text-danger"
            }
          ></i>
        </div>
      </div>
      <div className="row py-2">
        <div className="col-6">Número de Estímulos</div>
        <div className="col-6">
          {resultado.results.settings.estimulosPrueba}
        </div>
      </div>
      {renderCompletada()}
    </div>
  );
};

export default ResumenFlanker;
