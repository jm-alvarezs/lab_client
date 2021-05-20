import api from "./api";

const route = "/patients";

export default {
  getPacientes: () => api.get(route),
  getSinglePaciente: (id) => api.get(`${route}/${id}`),
  getPacientesAdmin: () => api.get(`${route}?admin=true`),
  postPaciente: (paciente) => api.post(route, { ...paciente }),
  updatePaciente: (paciente) =>
    api.put(`${route}/${paciente.id}`, { ...paciente }),
  deletePaciente: (id) => api.delete(`${route}/${id}`),
};
