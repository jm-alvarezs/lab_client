import api from "./api";

const route = "/tests";

export default {
  getResultados: () => api.get(`${route}`),
  getSingleTest: (id) => api.get(`${route}/${id}`),
};
