import api from "./api";

const route = "/results";

export default {
  getResultados: () => api.get(`${route}?paciente=1&idPrueba=1`),
};
