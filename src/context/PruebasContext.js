import React, { createContext, useReducer } from "react";
import PruebasReducer from "../reducers/PruebasReducer";
import PruebasService from "../services/PruebasService";
import { PRUEBA_RECIBIDA } from "../types";
import { displayError, displaySuccess } from "../utils";

const initialState = {
  pruebas: null,
  prueba: null,
};

const prueba = {
  tiempoExposicion: 500,
  tiempoInterestimular: 500,
  target: "A",
  fontFamily: "Courier",
  fontStyle: "bold",
  color: "#000",
  fontSize: 24,
  backgroundColor: "#000",
  numeroEstimulos: 5,
  aparicion: "17",
  keyCode: 13,
  duracion: 35,
  nombre: "Adultos",
  nombre_sujeto: "Juan Manuel Alvarez Sanchez",
  descripcion:
    "Estudiante universitario presenta déficit de atención durante clases y empleo…",
  edad: 22,
};

export const PruebasContext = createContext(initialState);

export const PruebasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PruebasReducer, initialState);

  const getPrueba = (idPrueba) => {
    dispatch({ type: PRUEBA_RECIBIDA, payload: prueba });
    /*PruebasService.getPrueba(idPrueba).then((res) => {
      const prueba = res.data.data;
      dispatch({ type: PRUEBA_RECIBIDA, payload: prueba });
    });*/
  };

  const postPrueba = (config) => {
    PruebasService.postPrueba(config)
      .then(() => {
        displaySuccess(dispatch, "Prueba agregada con éxito.");
      })
      .catch((error) => {
        displayError(dispatch, error);
      });
  };

  const postResultados = (resultados) => {
    PruebasService.postResultados(resultados);
  };

  return (
    <PruebasContext.Provider
      value={{ ...state, getPrueba, postPrueba, postResultados }}
    >
      {children}
    </PruebasContext.Provider>
  );
};
