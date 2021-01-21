import {
  LOGIN,
  LOGOUT,
  SHOW_SPINNER,
  HIDE_SPINNER,
  USER_CREATED,
  SHOW_ALERT,
  SET_PROPIEDAD_USER,
  SET_PROPIEDAD_LOGIN,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case LOGIN:
      const user = payload;
      return { ...state, user };
    case LOGOUT:
      return { ...state, user: null };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    case USER_CREATED:
      return { ...state, created: true };
    case SHOW_ALERT:
      return { ...state, error: payload };
    case SET_PROPIEDAD_USER: {
      const { key, value } = payload;
      const user = { ...state.user };
      user[key] = value;
      return { ...state, user };
    }
    case SET_PROPIEDAD_LOGIN:
      const { key, value } = payload;
      return { ...state, [key]: value };
    default:
      return { ...state };
  }
};
