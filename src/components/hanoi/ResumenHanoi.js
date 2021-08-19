import moment from "moment";
import React from "react";
import {
  getConteoErrores,
  getConteoRepetidos,
  getTiempoPromedio,
} from "../../utils";

const ResumenHanoi = ({ resultado, movimientos, startTime, finishTime }) => {
  return (
    <div className="card container shadow-sm p-3 mb-4">
      <h3 className="border-bottom pb-3 mb-2 bold">
        Prueba #{resultado !== null && resultado.test.id} - Torre de Hanoi
      </h3>
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
        <div className="col-6">{getTiempoPromedio(movimientos)}</div>
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
        <div className="col-6">Movimientos Repetidos</div>
        <div className="col-6">{getConteoRepetidos(movimientos)}</div>
      </div>
    </div>
  );
};

export default ResumenHanoi;
