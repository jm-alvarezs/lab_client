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
              resultado.results.settings.clave,
              "aciertos"
            )
          : getResultadoTargets(
              resultado.results.targets,
              resultado.results.settings.target,
              "aciertos"
            )}
      </p>
      <p>
        Errores:{" "}
        {isCondicional()
          ? getResultadoTargetsCondicional(
              resultado.results.targets,
              resultado.results.target,
              resultado.results.settings.clave,
              "errores"
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
              resultado.results.settings.clave,
              "omision",
              true
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
              resultado.results.prevTarget,
              "omision",
              false
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
              resultado.results.prevTarget,
              "click",
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
              resultado.results.prevTarget,
              "click",
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
