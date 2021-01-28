import api from "./api";

const route = "/users";

const AuthService = {
  userLoggedIn: () => api.get(route),
  signIn: (email, password) => api.post(`${route}/login`, { email, password }),
  signUp: (user) => {
    console.log(user);
    return api.post(route, { ...user });
  },
};

export default AuthService;
