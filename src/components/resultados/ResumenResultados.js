import React from "react";
import {
  getResultadoTargets,
  getResultadoTargetsCondicional,
} from "../../utils";

const ResumenResultados = ({ resultado }) => {
  const isCondicional = () => {
    return resultado.test.testType.id === 2;
  };

  return (
    <>
      <h3>Resumen</h3>
      <p>
        Aciertos:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              resultado.results.targets,
              resultado.results.target,
              "aciertos",
              resultado.results.settings.clave,
              true
            )
          : getResultadoTargets(
              resultado.results.targets,
              resultado.results.target,
              "aciertos"
            )}
      </p>
      <p>
        Errores:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              resultado.results.targets,
              resultado.results.target,
              "errores",
              resultado.results.settings.clave
            )
          : getResultadoTargets(
              resultado.results.targets,
              resultado.results.target,
              "errores"
            )}
      </p>
      <h4>Detalle</h4>
      <p>
        Omisiones Correctas:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              resultado.results.targets,
              resultado.results.target,
              "omision",
              resultado.results.settings.clave
            )
          : getResultadoTargets(
              resultado.results.targets,
              resultado.results.target,
              "omision",
              true
            )}
      </p>
      <p>
        Omisiones Incorrectas:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              resultado.results.targets,
              resultado.results.target,
              "omision",
              resultado.results.settings.clave,
              true
            )
          : getResultadoTargets(
              resultado.results.targets,
              resultado.results.target,
              "omision",
              false
            )}
      </p>
      <p>
        Clicks Correctos:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              resultado.results.targets,
              resultado.results.target,
              "click",
              resultado.results.settings.clave,
              true
            )
          : getResultadoTargets(
              resultado.results.targets,
              resultado.results.target,
              "click",
              true
            )}
      </p>
      <p>
        Clicks Incorrectos:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              resultado.results.targets,
              resultado.results.target,
              "click",
              resultado.results.settings.clave,
              false
            )
          : getResultadoTargets(
              resultado.results.targets,
              resultado.results.target,
              "click",
              false
            )}
      </p>
    </>
  );
};

export default ResumenResultados;
