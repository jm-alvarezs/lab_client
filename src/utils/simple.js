const getTargetResult = (current, target) => {
  if (current.target === target) {
    if (current.clicked) return true;
    return false;
  }
  if (current.clicked) return false;
  return true;
};

const getResultadoTargets = (targets, character, type, correct) => {
  switch (type) {
    case "aciertos":
      return targets.filter((target) => getTargetResult(target, character))
        .length;
    case "errores":
      return targets.filter((target) => !getTargetResult(target, character))
        .length;
    case "click":
      targets = targets.filter((target) => target.clicked);
      if (correct) {
        return targets.filter((target) => getTargetResult(target, character))
          .length;
      }
      return targets.filter((target) => !getTargetResult(target, character))
        .length;
    default:
      targets = targets.filter((target) => !target.clicked);
      if (correct) {
        targets = targets.filter((target) =>
          getTargetResult(target, character)
        );
        return targets.length;
      }
      return targets.filter((target) => !getTargetResult(target, character))
        .length;
  }
};

export const getResultadoSimple = (targets, settings) => {
  const errores = getResultadoTargets(targets, settings.target, "errores");
  const aciertos = getResultadoTargets(targets, settings.target, "aciertos");
  const clicksCorrectos = getResultadoTargets(
    targets,
    settings.target,
    "click",
    true
  );
  const clicksIncorrectos = getResultadoTargets(
    targets,
    settings.target,
    "click",
    false
  );
  const omisionesCorrectas = getResultadoTargets(
    targets,
    settings.target,
    "omision",
    true
  );
  const omisionesIncorrectas = getResultadoTargets(
    targets,
    settings.target,
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
