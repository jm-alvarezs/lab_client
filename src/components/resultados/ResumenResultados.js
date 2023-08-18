import React from "react";
import { calculateAverage, getResultadoTargets } from "../../utils";

const ResumenResultados = ({
  errores,
  aciertos,
  tiempoReaccion,
  clicksCorrectos,
  clicksIncorrectos,
  omisionesCorrectas,
  omisionesIncorrectas,
}) => {
  return (
    <>
      <h3>Resumen</h3>
      <p>Aciertos: {aciertos}</p>
      <p>Errores: {errores}</p>
      <p className="mb-1">Reaccion Media: {tiempoReaccion} ms</p>
      <h4>Detalle</h4>
      <p>Omisiones Correctas: {omisionesCorrectas}</p>
      <p>Omisiones Incorrectas: {omisionesIncorrectas}</p>
      <p>Clicks Correctos: {clicksCorrectos}</p>
      <p>Clicks Incorrectos: {clicksIncorrectos}</p>
    </>
  );
};

export default ResumenResultados;
