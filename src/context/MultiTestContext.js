import React, { createContext, useContext, useReducer } from "react";
import MultiTestReducer from "../reducers/MultiTestReducer";
import MultiTestService from "../services/MultiTestService";
import {
  CREATE_MULTITEST,
  MULTITEST_RECIBIDOS,
  SET_MULTITEST,
  SET_PROPIEDAD_MULTITEST,
} from "../types";
import { ModalContext } from "./ModalContext";

const initialState = {
  multitests: null,
  multitest: null,
};

export const MultiTestContext = createContext(initialState);

export const MultiTestProvider = ({ children }) => {
  const { success, alert } = useContext(ModalContext);

  const [state, dispatch] = useReducer(MultiTestReducer, initialState);

  const getMultiTests = () => {
    MultiTestService.getMultiTests().then((res) => {
      const { multitests } = res.data;
      dispatch({ type: MULTITEST_RECIBIDOS, payload: multitests });
    });
  };

  const getSingleMultiTest = (idMultiTest) => {
    MultiTestService.getSingleMultiTest(idMultiTest).then((res) => {
      const { multitest } = res.data;
      dispatch({ type: SET_MULTITEST, payload: multitest });
    });
  };

  const getMultiTestPatient = (idMultiTest, idPatient) => {
    MultiTestService.getMultiTestPatient(idMultiTest, idPatient).then((res) => {
      const { multitest } = res.data;
      dispatch({ type: SET_MULTITEST, payload: multitest });
    });
  };

  const createMultiTest = () => {
    dispatch({ type: CREATE_MULTITEST });
  };

  const setPropiedadMultiTest = (key, value) => {
    dispatch({ type: SET_PROPIEDAD_MULTITEST, payload: { key, value } });
  };

  const postMultiTest = (multitest) => {
    let service = MultiTestService.putMultiTest;
    if (isNaN(multitest.idMultiTest)) {
      service = MultiTestService.postMultiTest;
    }
    service(multitest)
      .then(() => {
        success("Prueba guardada.");
        getMultiTests();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <MultiTestContext.Provider
      value={{
        ...state,
        getMultiTests,
        createMultiTest,
        getSingleMultiTest,
        getMultiTestPatient,
        setPropiedadMultiTest,
        postMultiTest,
      }}
    >
      {children}
    </MultiTestContext.Provider>
  );
};
