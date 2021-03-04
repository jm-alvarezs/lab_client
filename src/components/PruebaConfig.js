import React from "react";

const PruebaConfig = ({ prueba }) => {
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
    duracion,
  } = prueba;
  return (
    <div className="container-fluid px-0">
      <h3 className="border-bottom pb-3 mb-3">Parámetros</h3>
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
      <div className="row">
        <div className="col-6">
          <label>Color de la Fuente</label>
        </div>
        <div className="col-6">
          <p>{color}</p>
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
          <label>Color del fondo</label>
        </div>
        <div className="col-6">
          <p>{backgroundColor}</p>
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
          <label>Aparición del Target</label>
        </div>
        <div className="col-6">
          <p>{aparicion}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Botón o tecla de respuesta</label>
        </div>
        <div className="col-6">
          <p>{keyCode}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Duración</label>
        </div>
        <div className="col-6">
          <p>
            {duracion}
            {"ms"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PruebaConfig;
