import moment from "moment";
import React from "react";

const MovimientoCard = ({ movimiento, prevMovimiento }) => {
  const getMoveStatus = (move) => {
    if (move.sizeOrigen < move.sizeDestino) {
      return <span className="text-danger">Error 3: Aprendizaje</span>;
    }
    if (move.origen === move.destino) {
      return <span className="text-danger">Error 2: Arrepentimiento</span>;
    }
    if (move.sizeOrigen === null && move.sizeDestino === null) {
      return <span className="text-danger">Error 1: Percepción</span>;
    }
    return <span className="text-success">Válido</span>;
  };

  const reaccion = Math.abs(
    moment(movimiento.timestamp_destino, "YYYY-MM-DD HH:mm:ss:SSS").diff(
      moment(movimiento.timestamp_origen, "YYYY-MM-DD HH:mm:ss:SSS"),
      "milliseconds"
    )
  );

  const intervalo =
    prevMovimiento !== null
      ? Math.abs(
          moment(movimiento.timestamp_origen, "YYYY-MM-DD HH:mm:ss:SSS").diff(
            moment(prevMovimiento.timestamp_destino, "YYYY-MM-DD HH:mm:ss:SSS"),
            "milliseconds"
          )
        )
      : 0;

  return (
    <div className="row py-2 my-2">
      <div className="col-2">
        P{movimiento.origen}-D{movimiento.sizeOrigen}
      </div>
      <div className="col-2">
        P{movimiento.destino}
        {"-"}
        {movimiento.sizeDestino !== null
          ? `D${movimiento.sizeDestino}`
          : "Vacío"}
      </div>
      <div className="col-2">{reaccion}</div>
      <div className="col-2">{intervalo}</div>
      <div className="col-2">
        {prevMovimiento !== null && <span>{intervalo + reaccion}</span>}
      </div>
      <div className="col-2">{getMoveStatus(movimiento)}</div>
    </div>
  );
};

export default MovimientoCard;
