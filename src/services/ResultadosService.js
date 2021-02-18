import api from "./api";

const route = "/results";

export default {
  getResultados: (idPrueba) => api.get(`${route}/${idPrueba}`),
};
