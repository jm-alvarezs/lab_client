import React from "react";
import { getEstimulosCondicional } from "../../utils";

const PruebaConfig = ({ idTestType, prueba }) => {
  const {
    tiempoExposicion,
    tiempoInterestimular,
    target,
    fontFamily,
    fontStyle,
    fontSize,
    color,
    backgroundColor,
    numeroEstimulos,
    aparicion,
    keyCode,
  } = prueba;
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-6">
          <label>Tiempo de Exposición</label>
        </div>
        <div className="col-6">
          <p>
            {tiempoExposicion}
            {"ms"}
          </p>
        </div>
      </div>
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
          <label>Target</label>
        </div>
        <div className="col-6">
          <p>{target}</p>
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
      <div className="row mb-2">
        <div className="col-6">
          <label>Color del fondo</label>
        </div>
        <div className="col-6">
          <input
            type="color"
            value={backgroundColor}
            className="form-control"
            disabled
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Número de Estímulos</label>
        </div>
        <div className="col-6">
          {idTestType === 2 ? getEstimulosCondicional(prueba) : numeroEstimulos}
        </div>
      </div>
      {idTestType === 1 && (
        <div className="row">
          <div className="col-6">
            <label>Aparición del Target</label>
          </div>
          <div className="col-6">
            <p>
              {aparicion}
              {"%"}
            </p>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-6">
          <label>Botón o tecla de respuesta</label>
        </div>
        <div className="col-6">
          <p>
            {keyCode === "any"
              ? "Cualquiera"
              : keyCode === "32"
              ? "Espacio"
              : "Intro"}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Duración</label>
        </div>
        <div className="col-6">
          <p>
            {((parseInt(tiempoExposicion) + parseInt(tiempoInterestimular)) *
              (idTestType === 2
                ? getEstimulosCondicional(prueba)
                : numeroEstimulos)) /
              1000}
            {" segundos"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PruebaConfig;
