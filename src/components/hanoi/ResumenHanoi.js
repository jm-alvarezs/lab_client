import moment from "moment";
import React from "react";
import {
  BASE_URL,
  getConteoErrores,
  getConteoRepetidos,
  getTiempoPromedio,
  getTiempoPromedioReflexion,
} from "../../utils";

const ResumenHanoi = ({
  toPdf,
  resultado,
  movimientos,
  startTime,
  finishTime,
}) => {
  return (
    <div className="card container shadow-sm p-3 mb-4">
      <div className="row border-bottom pb-3 mb-2">
        <div className="col-6">
          <h3 className="bold">
            Prueba #{resultado !== null && resultado.test.id} - Torre de Hanoi
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
        <div className="col-6">Número de movimientos</div>
        <div className="col-6">{movimientos.length}</div>
      </div>
      <div className="row py-2">
        <div className="col-6">Tiempo Total</div>
        <div className="col-6">
          {moment(finishTime).diff(startTime, "seconds")}.
          {moment(finishTime).diff(startTime, "miliseconds") % 1000} segundos
        </div>
      </div>
      <div className="row py-2">
        <div className="col-6">Tiempo medio por movimiento</div>
        <div className="col-6">{getTiempoPromedio(movimientos)} ms</div>
      </div>
      <div className="row py-2">
        <div className="col-6">Tiempo medio de reflexión</div>
        <div className="col-6">
          {getTiempoPromedioReflexion(movimientos)} ms
        </div>
      </div>
      <div className="row py-2">
        <div className="col-6">Error Tipo 1 (Percepción)</div>
        <div className="col-6">
          {getConteoErrores(movimientos, "percepcion")}
        </div>
      </div>
      <div className="row py-2">
        <div className="col-6">Error Tipo 2 (Arrepentimiento)</div>
        <div className="col-6">
          {getConteoErrores(movimientos, "arrepentimiento")}
        </div>
      </div>
      <div className="row py-2">
        <div className="col-6">Error Tipo 3 (Aprendizaje)</div>
        <div className="col-6">
          {getConteoErrores(movimientos, "aprendizaje")}
        </div>
      </div>
      <div className="row py-2">
        <div className="col-6">Movimientos Revertidos</div>
        <div className="col-6">{getConteoRepetidos(movimientos)}</div>
      </div>
    </div>
  );
};

export default ResumenHanoi;
