import { SINGLE_TEST_TYPE, TEST_TYPES_RECIBIDOS } from "../types";

const TestTypeReducer = (state, { type, payload }) => {
  switch (type) {
    case TEST_TYPES_RECIBIDOS:
      return { ...state, testTypes: payload };
    case SINGLE_TEST_TYPE:
      return { ...state, testType: payload };
    default:
      return { ...state };
  }
};
export default TestTypeReducer;
