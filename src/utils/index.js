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
