import { SHOW_SUCCESS, SHOW_ALERT, CLEAR_ALERT, CLEAR_SUCCESS } from "../types";
import moment from "moment";

moment.locale("es", {
  monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
});

export const displaySuccess = (dispatch, message) => {
  dispatch({ type: SHOW_SUCCESS, payload: message });
  setTimeout(() => {
    dispatch({ type: CLEAR_SUCCESS });
  });
};

export const displayError = (dispatch, error) => {
  if (typeof error === "object") {
    error = error.toString();
  }
  dispatch({ type: SHOW_ALERT, payload: error });
  setTimeout(() => dispatch({ type: CLEAR_ALERT }), 3000);
};

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://lab-cognicion-api.herokuapp.com";

export const searchRows = (query, rows) => {
  if (!rows) return;
  if (isNaN(query)) query = query.toLowerCase();
  let searchResult = rows.filter((row) => {
    let result = Object.keys(row).filter((column) => {
      if (Array.isArray(row[column])) {
        return row[column].filter((subcolumn) => {
          if (isNaN(subcolumn)) {
            if (subcolumn.toLowerCase().includes(query)) return row;
          } else if (subcolumn === query) return row;
          return null;
        });
      }
      if (isNaN(row[column])) {
        if (row[column].toLowerCase().includes(query)) {
          return row;
        }
      } else if (row[column] === query) {
        return row;
      } else if (row[column] === Number(query)) {
        return row;
      }
      return null;
    });
    return result.length > 0;
  });
  return searchResult;
};

export const getArgs = (args) => {
  if (args && args !== null) {
    const array = Object.keys(args)
      .map((key) => {
        if (args[key] && args[key] !== null && args[key] !== "") {
          return `${key}=${args[key]}`;
        }
        return null;
      })
      .filter((arg) => arg !== null);
    if (array.length > 0) {
      return `&${array.join("&")}`;
    }
  }
  return "";
};

export function formatMonto(monto) {
  monto = parseFloat(monto);
  if (!monto || monto === null || isNaN(monto)) monto = 0;
  return numberWithCommas(monto);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const hideModal = () => {
  const button = document.getElementById("main-button");
  if (button && button !== null) {
    button.click();
  }
};

export const showModal = () => {
  const button = document.getElementById("main-button");
  if (button && button !== null) {
    button.click();
  } else {
    const newButton = document.createElement("button");
    newButton.attributes.href = "#modal";
    newButton.id = "main-button";
    newButton.setAttribute("data-toggle", "modal");
    newButton.setAttribute("data-target", "#modal");
    newButton.setAttribute("data-bs-toggle", "modal");
    newButton.setAttribute("data-bs-target", "#modal");
    newButton.style.visibility = "hidden";
    document.body.appendChild(newButton);
    newButton.click();
  }
};

export const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const randomize = (items, iterations) => {
  for (let i = 0; i < iterations; i++) {
    shuffle(items);
  }
  return items;
};

export const calculateAverage = (items) => {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i];
  }
  return total / items.length;
};

export const getTargetResult = (
  current,
  target,
  condicional,
  clave,
  prevItem
) => {
  if (condicional) {
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
  }
  if (current.target === target) {
    if (current.clicked) return true;
    return false;
  }
  if (current.clicked) return false;
  return true;
};

export const getResultadoTargetsCondicional = (
  targets,
  character,
  type,
  prevCharacter,
  correct
) => {
  switch (type) {
    case "aciertos":
      return targets.filter((target, index) => {
        if (index === 0) {
          return !target.clicked;
        } else {
          if (target.target === character) {
            if (targets[index - 1].target === prevCharacter) {
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
            if (targets[index - 1].target === prevCharacter) {
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
              true,
              prevCharacter,
              index > 0 ? targets[index - 1] : {}
            );
          } else {
            return !getTargetResult(
              target,
              character,
              true,
              prevCharacter,
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
              true,
              prevCharacter,
              index > 0 ? targets[index - 1] : {}
            );
          } else {
            return getTargetResult(
              target,
              character,
              true,
              prevCharacter,
              index > 0 ? targets[index - 1] : {}
            );
          }
        }
        return false;
      }).length;
  }
};

export const getResultadoTargets = (targets, character, type, correct) => {
  switch (type) {
    case "aciertos":
      return targets.filter((target) =>
        getTargetResult(target, character, false)
      ).length;
    case "errores":
      return targets.filter(
        (target) => !getTargetResult(target, character, false)
      ).length;
    case "click":
      targets = targets.filter((target) => target.clicked);
      if (correct) {
        return targets.filter((target) =>
          getTargetResult(target, character, false)
        ).length;
      }
      return targets.filter(
        (target) => !getTargetResult(target, character, false)
      ).length;
    default:
      targets = targets.filter((target) => !target.clicked);
      if (correct) {
        return targets.filter((target) =>
          getTargetResult(target, character, false)
        ).length;
      }
      return targets.filter(
        (target) => !getTargetResult(target, character, false)
      ).length;
  }
};

export const preguntasCUPOM = [
  "No sabe si ha hecho lo que tenía que hacer. Por ejemplo, hay veces que hace las cosas dos veces porque no recuerda que las ha hecho antes.",
  "Hay veces que tiene que comprobar si ha hecho algo que tenía que hacer.",
  "Le cuesta trabajo pasar de un tema a otro dentro de una conversación.",
  "No sabe dónde pone las cosas.",
  "Hay lugares que conoce que ahora no reconoce.",
  "Vuelve a ver películas de TV, libros, revistas, etc... que a ha visto o leído como si fueran nuevos.",
  "Tiene dificultades para reconocer a personajes famosos de la TV o en las revistas (que conocía con anterioridad).",
  "Se olvida en su casa cosas u objetos que necesitaba y luego tiene que volver a recogerlos.",
  "Se olvida las cosas que tiene que hacer.",
  "Se olvida de acudir a citas.",
  "Se olvida de cumplir sus compromisos.",
  "Pierde el hilo de la conversación y a veces, no sabe de que estaba hablando.",
  "A lo largo de una conversación pregunta lo mismo varias veces, como si no lo hubiera preguntado.",
  "Se siente fatigado en conversaciones con argumento complejo.",
  "Se le ha olvidado cómo se hacen algunas cosas que sabe hacer de siempre.",
  "Le resulta díficil hacer, por ejemplo, comidas que sabe hacer, porque se le olvidan ingredientes, o porque se le olvidan las medidas de los mismos.",
  "Está torpe para hacer los trabajos o actividades que siempre ha hecho.",
  "Se le olvidad palabras o frases. Quiere decir algo y no encuentra la palabra o la frase adecuada.",
  "Le cuesta trabajo recordar cuál ha sido la fuente de su información. Por ejemplo, no recuerda quién le contó un hecho. No sabe dónde se enteró de un acontecimiento, etc...",
  "Confunde a las personas que le han contado las cosas, cree que ha sido una y luego es otra quien se lo contó.",
  "Le cuesta seguir una película de TV.",
  "Le cuesta concentrarse o mantener la atención.",
  "Se fatiga fácilmente en una conversación, leyendo o viendo TV.",
];

export const preguntasNechapi = [
  "Es una persona pasional",
  "Vive todo con intensidad",
  "Cuando se emociona es difícil calmarle",
  "Tiene emociones muy intensas",
  "Es capaz de comportarse de un modo realmente cruel",
  "Se angustia fácilmente",
  "Es una persona violenta",
  "Tiene conductas peligrosas",
  "Tiene control sobre sí mismo y su conducta",
  "Es una persona arisca",
  "Es una persona vulnerable",
  "Sin lugar a dudas, es una persona muy emotiva",
  "Es una persona que se mete mucho en líos",
  "No tiene miedo a nada",
  "Es una persona que tiene muchos amigos",
  "Participa en muchas actividades sociales",
  "Bebe más de lo que debiera",
  "Toma drogas",
  "Le gusta castigar a los demás",
  "Siempre está buscando emociones nuevas",
  "Es una persona caprichosa",
  "Es una persona que da pocas explicaciones",
  "Es una persona vergonzosa",
  "Se suele sentir culpable por cosas o hechos insignificantes",
  "Se puede decir que es más bien sádico",
  "Hace cosas como si no tuviera miedo, o no fuera consciente del peligro",
  "Es una persona abierta siempre a nuevas experiencias",
  "Siempre está buscando nuevas sensaciones",
  "Cuando hace algo, nunca tiene en cuenta cómo le sienta lo que ha hecho a los demás",
  "Es una persona a la que le interesan pocas cosas",
  "Es una persona hostil",
  "Es una persona frustrada",
  "Es una persona muy negativa",
  "Es una persona depresiva",
  "Tiene valor suficiente para suicidarse",
  "Le gusta el sexo",
  "Seguro que no le importa tener cualquier tipo de experiencia sexual, por rara que sea",
  "Tiene mucha experiencia sexual",
  "Se enfada rápidamente",
  "Tiene muchas ganas de vivir",
];

export const categoriasCUPOM = {
  trabajo: [3, 12, 13, 14, 18, 21, 22, 23],
  reconocimiento: [5, 6, 7],
  fijacion: [1, 2, 4],
  prospectiva: [8, 9, 10, 11],
  procedimental: [15, 16, 17],
};

export const getPuntuacionCUPOM = (categoria, respuestas) => {
  let total = 0;
  let positivas = 0;
  categoriasCUPOM[categoria].forEach((numero) => {
    let respuesta = respuestas[numero - 1];
    total++;
    if (respuesta === "si") {
      positivas++;
    }
  });
  return parseFloat(((positivas / total) * 100).toFixed(2));
};

export const categoriasNechapi = {
  anger: [5, 7, 8, 10, 13, 17, 18, 19, 25, 26, 31, 35],
  sensation: [1, 2, 20, 27, 28, 36, 37, 38, 40],
  emotional: [3, 4, 6, 11, 12, 24, 32, 33, 34],
  sociability: [14, 15, 16, 27],
  motivation: [21, 22, 23, 29, 30, 39],
};

export const getPuntuacionNechapi = (categoria, respuestas, tiempo) => {
  let total = 0;
  let puntuacion = 0;
  categoriasNechapi[categoria].forEach((numero) => {
    let respuesta = respuestas.find(
      (resp) => parseInt(resp.index) === parseInt(numero)
    );
    total += 5;
    if (respuesta) {
      puntuacion += parseInt(respuesta[tiempo]);
    }
  });
  return parseFloat((puntuacion / total).toFixed(2)) * 100;
};

export const generateRandom = (type) => {
  if (type === "nechapi") {
    return new Array(24).fill(1).map((one, index) => ({
      numero: index + 1,
      antes: parseFloat(Math.floor(Math.random() * 5 + 1) * 100),
      despues: parseFloat(Math.floor(Math.random() * 5 + 1) * 100),
    }));
  }
  return new Array(24).fill(1).map((one, index) => ({
    numero: index + 1,
    respuesta: Math.floor(Math.random() * 1) > 1,
  }));
};

export const secciones = {
  corteza: {
    has_side: true,
    options: [
      {
        name: "Lóbulo frontal",
        value: "frontal",
      },
      {
        name: "Lóbulo temporal",
        value: "temporal",
      },
      {
        name: "Lóbulo parietal",
        value: "parietal",
      },
      {
        name: "Lóbulo occipital",
        value: "occipital",
      },
    ],
  },
  subcorteza: {
    has_side: true,
    options: [
      {
        name: "Tálamo",
        value: "talamo",
      },
      {
        name: "Ganglios de la base",
        value: "ganglios",
      },
      {
        name: "Hipotálamo",
        value: "hipotalamo",
      },
      {
        name: "Glándula pineal",
        value: "glandula",
      },
    ],
  },
  tronco: {
    options: [
      {
        name: "Bulbo raquídeo",
        value: "bulbo",
      },
      {
        name: "Protuberancia",
        value: "protuberancia",
      },
      {
        name: "Mesencéfalo",
        value: "mesencefalo",
      },
    ],
  },
  cerebelo: {
    options: [
      {
        name: "Izquierdo",
        value: "izquierdo",
      },
      {
        name: "Derecho",
        value: "derecho",
      },
      {
        name: "Bihemisférico",
        value: "Bihemisférico",
      },
    ],
  },
  lobulos: {
    options: [
      {
        name: "Izquierdo",
        value: "izquierdo",
      },
      {
        name: "Derecho",
        value: "derecho",
      },
      {
        name: "Bihemisférico",
        value: "Bihemisférico",
      },
    ],
  },
};

export const getChartSeries = (type, respuestas, tiempo) => {
  if (type === "nechapi") {
    return Object.keys(categoriasNechapi).map((key) =>
      getPuntuacionNechapi(key, respuestas, tiempo)
    );
  }
  return Object.keys(categoriasCUPOM).map((key) =>
    getPuntuacionCUPOM(key, respuestas)
  );
};

export const discs = [
  {
    color: "naranja",
    size: 1,
  },
  {
    color: "negro",
    size: 2,
  },
  {
    color: "amarillo",
    size: 3,
  },
  {
    color: "verde",
    size: 4,
  },
  {
    color: "rojo",
    size: 5,
  },
];

export const getTiempoPromedio = (movimientos) => {
  let suma = 0;
  movimientos.forEach((movimiento) => {
    suma += moment(movimiento.timestamp_destino).diff(
      movimiento.timestamp_origen,
      "miliseconds"
    );
  });
  return parseFloat(suma / movimientos.length).toFixed(2);
};

export const getTiempoPromedioReflexion = (movimientos) => {
  let suma = 0;
  movimientos.forEach((movimiento, index) => {
    if (index > 0) {
      suma += moment(movimiento.timestamp_origen).diff(
        movimientos[index - 1].timestamp_destino,
        "miliseconds"
      );
    }
  });
  return parseFloat(suma / (movimientos.length - 1)).toFixed(2);
};

export const getConteoErrores = (movimientos, error) => {
  return movimientos.filter((movimiento) => movimiento.error === error).length;
};

export const getConteoRepetidos = (movimientos) => {
  let repetidos = 0;
  let prevMovimiento = null;
  movimientos.forEach((movimiento) => {
    if (prevMovimiento === null) {
      prevMovimiento = movimiento;
    } else {
      if (
        prevMovimiento.destino === movimiento.origen &&
        prevMovimiento.origen === movimiento.destino
      ) {
        repetidos++;
      }
    }
  });
  return repetidos;
};

export const getConfig = (defaultConfig) => {
  let currentConfig = { ...defaultConfig };
  let token = window.location.href.split("token=")[1];
  if (token) token = token.split("&")[0];
  let idTest = window.location.href.split("idTest=")[1];
  if (idTest) idTest = idTest.split("&")[0];
  let params = window.location.href.split("?")[1];
  params = params.split("&");
  params.forEach((elem) => {
    const single = elem.split("=");
    if (!isNaN(single[1])) {
      currentConfig[single[0]] = parseInt(single[1]);
    } else {
      currentConfig[single[0]] = single[1];
    }
  });
  currentConfig.token = token;
  currentConfig.idTest = idTest;
  return currentConfig;
};

export const allTests = [
  { id: 1, name: "Atencion Simple", key: "atencion" },
  { id: 2, name: "Atencion Condicional", key: "condicional" },
  { id: 3, name: "Hemi Atención", key: "hemi" },
  { id: 4, name: "Torre de Hanoi", key: "hanoi" },
  { id: 5, name: "Flanker Task", key: "flanker" },
];

export const testsNechapi = allTests.filter((test) => test.id !== 3);

export const processMultiTestUrl = (url) => {
  let href = url;
  href = href.split("?")[1];
  let tests = href.split("&")[0];
  let tokens = href.split("&")[1];
  if (tokens) {
    tokens = tokens.split("=")[1];
    tokens = tokens.split(",");
  }
  tests = tests.split("=")[1];
  tests = tests.split(",");
  tests = tests.map((test) => parseInt(test));
  return { tests, tokens };
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getEstimulosCondicional = (prueba) => {
  return (
    (parseInt(prueba.claveTarget) +
      parseInt(prueba.claveNoTarget) +
      parseInt(prueba.noClaveNoTarget) +
      parseInt(prueba.noClaveTarget)) *
    2
  );
};
