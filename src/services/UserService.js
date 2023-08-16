import api from "./api";

const route = "/users";

const UserService = {
  getCurrentUser: () => api.get(route),
  setToken: (token) => (api.defaults.headers.common["Authorization"] = token),
  getUserByPhone: (phone) => api.get(`${route}/phone?phone=${phone}`),
  getAllUsers: () => api.get(`${route}/admin/all`),
  postSignUp: (data) => api.post(route, { ...data }),
  updateCurrentUser: (data) => api.put(route, { ...data }),
  recoverPassword: (email) => api.post(`${route}/recover`, { email }),
  deleteCurrentUser: () => api.delete(route),
};

export default UserService;
