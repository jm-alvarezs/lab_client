import api from "./api";

const route = "/patients";

export default {
  getPacientes: () => api.get(route),
  getSinglePaciente: (id) => api.get(`${route}/${id}`),
  getPacientesAdmin: () => api.get(`${route}?admin=true`),
};
