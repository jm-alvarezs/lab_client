import React, { useState } from "react";
import EstimuloFlankerCard from "./EstimuloFlankerCard";

const FlankerEstimulos = ({ estimulos, right, left }) => {
  const [showMovimientos, setShowMovimientos] = useState(true);

  const renderMovimientos = () => {
    if (showMovimientos) {
      return (
        <div>
          <div className="row bold bg-light border py-2 my-2">
            <div className="col-2">Tipo</div>
            <div className="col-2">Posición</div>
            <div className="col-1">Target</div>
            <div className="col-2">Oprimido</div>
            <div className="col-2">Reacción (ms)</div>
            <div className="col-2">Intervalo (ms)</div>
            <div className="col-1">Valido</div>
          </div>
          {estimulos.map((estimulo, index) => (
            <EstimuloFlankerCard
              key={index}
              estimulo={estimulo}
              right={right}
              left={left}
              prevEstimulo={index > 0 ? estimulos[index - 1] : null}
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
          <h3 className="bold">Estímulos</h3>
        </div>
        <div className="col-4 text-right">
          <button
            className="btn btn-outline-secondary"
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

export default FlankerEstimulos;
