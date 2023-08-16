import moment from "moment";
import React from "react";

const StroopConfig = ({ prueba }) => {
  const renderDuracion = () => {
    return moment(prueba.endTime, "YYYY-MM-DD HH:mm:ss:SSS").diff(
      moment(prueba.startTime, "YYYY-MM-DD HH:mm:ss:SSS"),
      "seconds"
    );
  };

  const {
    tiempoInterestimular,
    numeroEstimulos,
    fontFamily,
    fontStyle,
    fontSize,
    color,
  } = prueba.settings;
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-6">
          <label>Tiempo Interestimular</label>
        </div>
        <div className="col-6">
          <p>
            {tiempoInterestimular}
            {"ms"}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Tipo de Letra</label>
        </div>
        <div className="col-6">
          <p>{fontFamily}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Estilo de Fuente</label>
        </div>
        <div className="col-6">
          <p>{fontStyle}</p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <label>Color de la Fuente</label>
        </div>
        <div className="col-6">
          <input type="color" value={color} className="form-control" disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Tamaño de la Fuente</label>
        </div>
        <div className="col-6">
          <p>{fontSize}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Número de Estímulos</label>
        </div>
        <div className="col-6">{numeroEstimulos}</div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Duración</label>
        </div>
        <div className="col-6">
          <p>{renderDuracion()} segundos</p>
        </div>
      </div>
    </div>
  );
};

export default StroopConfig;
