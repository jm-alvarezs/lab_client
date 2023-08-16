import React from "react";
import {
  calculateAverage,
  getResultadoTargets,
  getResultadoTargetsCondicional,
} from "../../utils";

const ResumenResultados = ({ result }) => {
  const isCondicional = () => {
    return result.test.testType.id === 2;
  };

  const getTiempoReaccion = () => {
    if (result && result !== null) {
      if (result.results.targets && result.results.targets !== null) {
        let reacciones = result.results.targets.map((target) =>
          target.reaction ? target.reaction : null
        );
        reacciones = reacciones.filter((item) => item !== null);
        return parseInt(calculateAverage(reacciones));
      }
    }
    return "N/D";
  };

  return (
    <>
      <h3>Resumen</h3>
      <p>
        Aciertos:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              result.results.targets,
              result.results.target,
              "aciertos",
              result.results.settings.clave,
              true
            )
          : getResultadoTargets(
              result.results.targets,
              result.results.target,
              "aciertos"
            )}
      </p>
      <p>
        Errores:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              result.results.targets,
              result.results.target,
              "errores",
              result.results.settings.clave
            )
          : getResultadoTargets(
              result.results.targets,
              result.results.target,
              "errores"
            )}
      </p>
      <p className="mb-1">Reaccion Media: {getTiempoReaccion()} ms</p>
      <h4>Detalle</h4>
      <p>
        Omisiones Correctas:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              result.results.targets,
              result.results.target,
              "omision",
              result.results.settings.clave
            )
          : getResultadoTargets(
              result.results.targets,
              result.results.target,
              "omision",
              true
            )}
      </p>
      <p>
        Omisiones Incorrectas:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              result.results.targets,
              result.results.target,
              "omision",
              result.results.settings.clave,
              true
            )
          : getResultadoTargets(
              result.results.targets,
              result.results.target,
              "omision",
              false
            )}
      </p>
      <p>
        Clicks Correctos:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              result.results.targets,
              result.results.target,
              "click",
              result.results.settings.clave,
              true
            )
          : getResultadoTargets(
              result.results.targets,
              result.results.target,
              "click",
              true
            )}
      </p>
      <p>
        Clicks Incorrectos:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              result.results.targets,
              result.results.target,
              "click",
              result.results.settings.clave,
              false
            )
          : getResultadoTargets(
              result.results.targets,
              result.results.target,
              "click",
              false
            )}
      </p>
    </>
  );
};

export default ResumenResultados;
