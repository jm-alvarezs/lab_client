import React, { createContext } from "react";
import { useReducer } from "react/cjs/react.development";
import PaymentsReducer from "../reducers/PaymentsReducer";
import PaymentsService from "../services/PaymentsService";
import { PAYMENTS_RECIBIDOS } from "../types";

const initialState = {
  payments: null,
};

export const PaymentsContext = createContext(initialState);

export const PaymentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PaymentsReducer, initialState);

  const getMyPayments = () => {
    PaymentsService.getMyPayments().then((res) => {
      const payments = res.data.data;
      dispatch({ type: PAYMENTS_RECIBIDOS, payload: payments });
    });
  };

  return (
    <PaymentsContext.Provider value={{ ...state, getMyPayments }}>
      {children}
    </PaymentsContext.Provider>
  );
};
