import api from "./api";

const route = "/users";

export const setToken = (token) => {
  api.defaults.headers["Authorization"] = token;
};

const AuthService = {
  getUser: () => api.get(route),
  userLoggedIn: () => api.get(route),
  signIn: (email, password) => api.post(`${route}/login`, { email, password }),
  signUp: (user) => {
    console.log(user);
    return api.post(route, { ...user });
  },
};

export default AuthService;
