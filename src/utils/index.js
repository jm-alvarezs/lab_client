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

export const BASE_URL = "https://lab-cognicion-api.herokuapp.com";

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
    console.log(newButton);
    newButton.click();
  }
};

export const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export const randomize = (items, iterations) => {
  for (let i = 0; i < iterations; i++) {
    shuffle(items);
  }
  return items;
};

export const calculateAverage = (items) => {
  console.log(items);
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
  prevTarget,
  prevItem
) => {
  if (condicional) {
    if (current.clicked) {
      return current.character === target && prevItem.character === prevTarget;
    }
    return current.character !== target;
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
  prevCharacter,
  type,
  correct
) => {
  switch (type) {
    case "aciertos":
      return targets.filter((target, index) => {
        if (index === 0) {
          return !target.clicked;
        } else {
          if (target.character === character) {
            if (targets[index - 1].character === prevCharacter) {
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
          if (target.character === character) {
            if (targets[index - 1].character === prevCharacter) {
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
            if (index === 0) return false;
            return (
              targets[index - 1].character === prevCharacter &&
              target.character === character
            );
          } else {
            if (index === 0) return true;
            return (
              targets[index - 1].character !== prevCharacter &&
              target.character === character
            );
          }
        }
        return false;
      }).length;
    default:
      return targets.filter((target, index) => {
        if (!target.clicked) {
          if (correct) {
            if (index === 0) return true;
            return (
              targets[index - 1].character !== prevCharacter &&
              target.character === character
            );
          } else {
            if (index === 0) return false;
            return (
              targets[index - 1].character === prevCharacter &&
              target.character === character
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
      return targets.filter(
        (target) =>
          (target.clicked && target.character === character) ||
          (!target.clicked && target.character !== character)
      ).length;
    case "errores":
      return targets.filter(
        (target) =>
          (target.clicked && target.character !== character) ||
          (!target.clicked && target.character === character)
      ).length;
    case "click":
      if (correct) {
        return targets.filter(
          (target) => target.clicked && target.character === character
        ).length;
      }
      return targets.filter(
        (target) => target.clicked && target.character !== character
      ).length;
    default:
      if (correct) {
        return targets.filter(
          (target) => !target.clicked && target.character !== character
        ).length;
      }
      return targets.filter(
        (target) => !target.clicked && target.character === character
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
    let respuesta = respuestas.find((resp) => resp.numero === numero);
    total++;
    if (respuesta.respuesta) {
      positivas++;
    }
  });
  return parseFloat((positivas / total).toFixed(2));
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
    let respuesta = respuestas.find((resp) => resp.numero === numero);
    total += 5;
    if (respuesta) {
      puntuacion += respuesta[tiempo];
    }
  });
  return parseFloat((puntuacion / total).toFixed(2));
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
    respuesta: Math.floor(Math.random() * 2) > 1,
  }));
};
