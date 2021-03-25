import {
  SET_PROPIEDAD_USER,
  SINGLE_USER_RECIBIDO,
  USUARIOS_RECIBIDOS,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case USUARIOS_RECIBIDOS:
      return { ...state, usuarios: payload };
    case SINGLE_USER_RECIBIDO:
      return { ...state, usuario: payload };
    case SET_PROPIEDAD_USER:
      const { key, value } = payload;
      const usuario = { ...state.usuario };
      usuario[key] = value;
      return { ...state, usuario };
    default:
      return { ...state };
  }
};
