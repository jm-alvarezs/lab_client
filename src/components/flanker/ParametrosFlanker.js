import React, { useState } from "react";

const ParametrosFlanker = ({ settings }) => {
  const [showMovimientos, setShowMovimientos] = useState(true);

  const renderSeccion = () => {
    if (showMovimientos) {
      const {
        estimulosPrueba,
        fontSize,
        backgroundColor,
        color,
        leftKey,
        rightKey,
      } = settings;
      return (
        <>
          <div className="row py-2">
            <div className="col-6">Estímulos</div>
            <div className="col-6">{estimulosPrueba}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Tamaño de la Fuenta</div>
            <div className="col-6">{fontSize} px</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Color de Fondo</div>
            <div className="col-6">
              <input
                type="color"
                className="form-control"
                value={backgroundColor}
                disabled
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Color de Flechas</div>
            <div className="col-6">
              <input
                type="color"
                className="form-control"
                value={color}
                disabled
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Tecla Izquierda</div>
            <div className="col-6">{leftKey}</div>
          </div>

          <div className="row py-2">
            <div className="col-6">Tecla Derecha</div>
            <div className="col-6">{rightKey}</div>
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

export default ParametrosFlanker;
