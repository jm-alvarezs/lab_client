import React, { createContext, useReducer } from "react";
import TestTypeReducer from "../reducers/TestTypeReducer";
import TestTypesService from "../services/TestTypesService";
import { SINGLE_TEST_TYPE, TEST_TYPES_RECIBIDOS } from "../types";

const initialState = {
  testTypes: null,
};

export const TestTypeContext = createContext(initialState);

export const TestTypeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TestTypeReducer, initialState);

  const getTestTypes = () => {
    TestTypesService.getTestTypes().then((res) => {
      const { testTypes } = res.data;
      dispatch({ type: TEST_TYPES_RECIBIDOS, payload: testTypes });
    });
  };

  const getSingleTestType = (idTestType) => {
    TestTypesService.getTestTypes().then((res) => {
      const { testTypes } = res.data;
      const testType = testTypes.find((testType) => testType.id === idTestType);
      if (testType) {
        dispatch({ type: SINGLE_TEST_TYPE, payload: testType });
      }
    });
  };

  return (
    <TestTypeContext.Provider
      value={{ ...state, getTestTypes, getSingleTestType }}
    >
      {children}
    </TestTypeContext.Provider>
  );
};
