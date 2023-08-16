import React, { useState } from "react";
import MovimientoCard from "./MovimientoCard";

const MovimientosHanoi = ({ movimientos }) => {
  const [showMovimientos, setShowMovimientos] = useState(true);

  const renderMovimientos = () => {
    if (showMovimientos) {
      return (
        <div>
          <div className="row bold bg-light border py-2 my-2">
            <div className="col-2">Origen</div>
            <div className="col-2">Destino</div>
            <div className="col-2">Tiempo (ms)</div>
            <div className="col-2">Intervalo (ms)</div>
            <div className="col-2">Total (ms)</div>
            <div className="col-2">Estado</div>
          </div>
          {movimientos.map((movimiento, index) => (
            <MovimientoCard
              key={index}
              movimiento={movimiento}
              prevMovimiento={index > 0 ? movimientos[index - 1] : null}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="card container shadow-sm p-3 mb-4">
      <div className="row">
        <div className="col-8">
          <h3 className="bold">Movimientos</h3>
        </div>
        <div className="col-4 text-end">
          <button
            className="btn btn-outline-dark"
            onClick={() => setShowMovimientos(!showMovimientos)}
          >
            <i className={`fa fa-eye${showMovimientos ? "-slash" : ""}`}></i>
          </button>
        </div>
      </div>

      {renderMovimientos()}
    </div>
  );
};

export default MovimientosHanoi;
