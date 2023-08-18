export const getResultsCondicional = (targets, settings) => {
  const errores = getResultadoTargetsCondicional(
    targets,
    settings.target,
    settings.clave,
    "errores"
  );
  const aciertos = getResultadoTargetsCondicional(
    targets,
    settings.target,
    settings.clave,
    "aciertos"
  );
  const clicksCorrectos = getResultadoTargetsCondicional(
    targets,
    settings.target,
    settings.clave,
    "click",
    true
  );
  const clicksIncorrectos = getResultadoTargetsCondicional(
    targets,
    settings.target,
    settings.clave,
    "click",
    false
  );
  const omisionesCorrectas = getResultadoTargetsCondicional(
    targets,
    settings.target,
    settings.clave,
    "omision",
    true
  );
  const omisionesIncorrectas = getResultadoTargetsCondicional(
    targets,
    settings.target,
    settings.clave,
    "",
    false
  );
  return {
    errores,
    aciertos,
    clicksCorrectos,
    clicksIncorrectos,
    omisionesCorrectas,
    omisionesIncorrectas,
  };
};

const getTargetResult = (current, target, clave, prevItem) => {
  if (current.clicked) {
    return current.target === target && prevItem.target === clave;
  }
  if (current.target === target) {
    return prevItem.target !== clave;
  }
  if (prevItem.target !== clave) {
    return current.target !== target;
  }
  return current.target !== target;
};

const getResultadoTargetsCondicional = (
  targets,
  character,
  key,
  type,
  correct
) => {
  switch (type) {
    case "aciertos":
      return targets.filter((target, index) => {
        if (index === 0) {
          return !target.clicked;
        } else {
          if (target.target === character) {
            if (targets[index - 1].target === key) {
              return target.clicked;
            }
          }
          return !target.clicked;
        }
      }).length;
    case "errores":
      return targets.filter((target, index) => {
        if (index === 0) {
          return target.clicked;
        } else {
          if (target.target === character) {
            if (targets[index - 1].target === key) {
              return !target.clicked;
            }
          }
          return target.clicked;
        }
      }).length;
    case "click":
      return targets.filter((target, index) => {
        if (target.clicked) {
          if (correct) {
            return getTargetResult(
              target,
              character,
              key,
              index > 0 ? targets[index - 1] : {}
            );
          } else {
            return !getTargetResult(
              target,
              character,
              key,
              index > 0 ? targets[index - 1] : {}
            );
          }
        }
        return false;
      }).length;
    default:
      return targets.filter((target, index) => {
        if (!target.clicked) {
          if (correct) {
            return !getTargetResult(
              target,
              character,
              key,
              index > 0 ? targets[index - 1] : {}
            );
          } else {
            return getTargetResult(
              target,
              character,
              key,
              index > 0 ? targets[index - 1] : {}
            );
          }
        }
        return false;
      }).length;
  }
};
