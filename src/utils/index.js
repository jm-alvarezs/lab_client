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
  (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "") +
  "/api";

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
