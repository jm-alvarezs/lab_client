import moment from "moment";

export const getTiempoReaccionFlanker = (estimulos) => {
  let suma = 0;
  let clicks = 0;
  estimulos.forEach((estimulo) => {
    if (estimulo.clicked) {
      suma += moment(estimulo.clicked).diff(estimulo.emitted, "miliseconds");
      clicks++;
    }
  });
  return parseFloat(suma / clicks).toFixed(2);
};

export const getErroresFlanker = (estimulos, left, right) => {
  let errores = 0;
  estimulos.forEach((estimulo) => {
    if (!estimulo.clicked) errores++;
    else if (
      estimulo.direction === "left" &&
      String(estimulo.char) !== String(left).toLowerCase()
    )
      errores++;
    else if (
      estimulo.direction === "right" &&
      String(estimulo.char) !== String(right).toLowerCase()
    )
      errores++;
  });
  return errores;
};

export const getOmisionesFlanker = (estimulos) => {
  return estimulos.filter((estimulo) => !estimulo.clicked).length;
};

export const getErroresFlankerTipo = (estimulos, type, left, right) => {
  if (type === "direction") {
    estimulos = estimulos.filter((estimulo) => estimulo.clicked);
  } else {
    estimulos = estimulos.filter((estimulo) => estimulo.type === type);
  }
  return getErroresFlanker(estimulos, left, right);
};

export const getEstimulosFlanker = (estimulos) => {
  const division = estimulos / 2;
  const seccion = division / 3;
  const divisionSeccion = seccion / 2;
  let estimulosObj = [];
  let position = "top";
  let direction = "left";
  let type = "congruent";
  for (let i = 0; i < estimulos; i++) {
    if (i > 0 && i % division === 0) {
      position = "bottom";
    }
    if (i % seccion === 0) {
      switch (type) {
        case "congruent":
          type = "incongruent";
          break;
        case "incongruent":
          type = "neutral";
          break;
        default:
          type = "congruent";
      }
    }
    if (i % divisionSeccion === 0) {
      if (direction === "left") {
        direction = "right";
      } else {
        direction = "left";
      }
    }
    estimulosObj.push({
      type,
      direction,
      position,
    });
  }
  return estimulosObj;
};

export const isValidFlanker = (estimulo, right, left) => {
  let valid = true;
  if (!estimulo.clicked) valid = false;
  else if (
    estimulo.direction === "left" &&
    String(estimulo.char) !== String(left).toLowerCase()
  )
    valid = false;
  else if (
    estimulo.direction === "right" &&
    String(estimulo.char) !== String(right).toLowerCase()
  )
    valid = false;
  return valid;
};
