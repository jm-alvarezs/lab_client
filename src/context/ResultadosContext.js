import React, { createContext, useReducer } from "react";
import ResultadosReducer from "../reducers/ResultadosReducer";
import ResultadosService from "../services/ResultadosService";
import {
  RESULTADOS_RECIBIDOS,
  SINGLE_RESULTADO_RECIBIDO,
  FIABILITY_RECIBIDA,
} from "../types";
import moment from "moment";
import SurveyService from "../services/SurveyService";

const initialState = {
  resultados: null,
};

export const ResultadosContext = createContext(initialState);

export const ResultadosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ResultadosReducer, initialState);

  const getResultados = () => {
    ResultadosService.getResultados().then((res) => {
      dispatch({ type: RESULTADOS_RECIBIDOS, payload: res.data.data });
    });
  };

  const getResultadosAdmin = () => {
    ResultadosService.getResultadosAdmin().then((res) => {
      dispatch({ type: RESULTADOS_RECIBIDOS, payload: res.data.data });
    });
  };

  const getCuestionarioResults = (id) => {
    SurveyService.getSingleSurvey(id).then((res) => {
      const survey = res.data.data;
      dispatch({ type: SINGLE_RESULTADO_RECIBIDO, payload: survey });
    });
  };

  const fetchResults = (idPatient, idTestType, startDate, endDate) => {
    dispatch({ type: RESULTADOS_RECIBIDOS, payload: null });
    ResultadosService.fetchResults(
      idPatient,
      idTestType,
      startDate,
      endDate
    ).then((res) => {
      const results = res.data.data;
      dispatch({ type: RESULTADOS_RECIBIDOS, payload: results });
    });
  };

  const getSingleTest = (id) => {
    ResultadosService.getSingleTest(id).then((res) => {
      const test = res.data.data;
      if (test.results) {
        if (test.results.targets) {
          test.results.targets.forEach((singleTarget) => {
            if (singleTarget.clicked) {
              singleTarget.reaction = moment(singleTarget.clicked).diff(
                singleTarget.timestamp,
                "milliseconds"
              );
            }
          });
        }
      }
      dispatch({ type: SINGLE_RESULTADO_RECIBIDO, payload: test });
    });
  };

  const getFiablity = () => {
    ResultadosService.getFiability().then((res) => {
      const data = res.data.data;
      dispatch({ type: FIABILITY_RECIBIDA, payload: data });
    });
  };

  const clearSingleResultado = () => {
    dispatch({ type: SINGLE_RESULTADO_RECIBIDO, payload: null });
  };

  const clearResultados = () => {
    dispatch({ type: RESULTADOS_RECIBIDOS, payload: null });
  };

  return (
    <ResultadosContext.Provider
      value={{
        ...state,
        getFiablity,
        fetchResults,
        getSingleTest,
        getResultados,
        clearResultados,
        getResultadosAdmin,
        clearSingleResultado,
        getCuestionarioResults,
      }}
    >
      {children}
    </ResultadosContext.Provider>
  );
};
