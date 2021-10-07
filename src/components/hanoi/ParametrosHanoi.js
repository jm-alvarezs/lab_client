import React, { useState } from "react";

const ParametrosHanoi = ({ idTest, settings, putResultados }) => {
  const [showMovimientos, setShowMovimientos] = useState(true);
  const [rule, setRule] = useState("Si");

  const renderSeccion = () => {
    if (showMovimientos) {
      return (
        <>
          <div className="row py-2">
            <div className="col-6">Administracion</div>
            <div className="col-6">{settings.administracion}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Discos</div>
            <div className="col-6">{settings.discos}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Sonido Error</div>
            <div className="col-6">
              {settings.sonidoError ? (
                <i className="fa fa-check"></i>
              ) : (
                <i className="fa fa-times"></i>
              )}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Mensaje Error</div>
            <div className="col-6">
              {settings.mensajeError ? (
                <i className="fa fa-check"></i>
              ) : (
                <i className="fa fa-times"></i>
              )}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">¿Descubrió la regla?</div>
            <div className="col-3">
              <select
                className="form-control"
                value={rule}
                onChange={(e) => setRule(e.target.value)}
              >
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-3">
              <button
                className="btn btn-outline-dark"
                onClick={() => putResultados(idTest, rule)}
              >
                <i className="fa fa-save"></i>
              </button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="card container shadow-sm p-3 mb-4">
      <div className="row border-bottom pb-3 mb-2">
        <div className="col-6">
          <h3 className="bold">Parámetros</h3>
        </div>
        <div className="col-6 text-right">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowMovimientos(!showMovimientos)}
          >
            <i className={`fa fa-eye${showMovimientos ? "-slash" : ""}`}></i>
          </button>
        </div>
      </div>
      {renderSeccion()}
    </div>
  );
};

export default ParametrosHanoi;
