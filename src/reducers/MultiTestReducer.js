import {
  CREATE_MULTITEST,
  MULTITEST_RECIBIDOS,
  SET_MULTITEST,
  SET_PROPIEDAD_MULTITEST,
} from "../types";

const schema = {
  id: "new",
  name: "",
  tests: [],
};

const MultiTestReducer = (state, { type, payload }) => {
  switch (type) {
    case MULTITEST_RECIBIDOS:
      return { ...state, multitests: payload };
    case SET_MULTITEST:
      return { ...state, multitest: payload };
    case SET_PROPIEDAD_MULTITEST:
      const { key, value } = payload;
      const multitest = { ...state.multitest };
      multitest[key] = value;
      return { ...state, multitest };
    case CREATE_MULTITEST:
      return { ...state, multitest: schema };
    default:
      return { ...state };
  }
};
export default MultiTestReducer;
