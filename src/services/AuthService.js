import api from "./api";

const route = "/users";

export const setToken = (token) => {
  api.defaults.headers["Authorization"] = token;
};

const AuthService = {
  getUser: () => api.get(route),
  userLoggedIn: () => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      return token;
    }
  },
  signIn: (email, password) => api.post(`${route}/login`, { email, password }),
  signUp: (user) => api.post(route, { ...user }),
  signOut: () => setToken(""),
};

export default AuthService;
