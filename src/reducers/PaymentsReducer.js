import { PAYMENTS_RECIBIDOS } from "../types";

const PaymentsReducer = (state, { type, payload }) => {
  switch (type) {
    case PAYMENTS_RECIBIDOS:
      return { ...state, payments: payload };
    default:
      return { ...state };
  }
};
export default PaymentsReducer;
