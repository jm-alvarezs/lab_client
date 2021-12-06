import api from "./api";

const route = "/tests";

export default {
  getResultados: () => api.get(`${route}`),
  getResultadosAdmin: () => api.get(`${route}?admin=true`),
  fetchResults: (idPatient, idTestType, startDate, endDate) =>
    api.get(
      `${route}/search?idPatient=${idPatient}&type=${idTestType}&startDate=${startDate}&endDate=${endDate}`
    ),
  getSingleTest: (id) => api.get(`${route}/${id}`),
  getFiability: () => api.get(`${route}/fiability`),
};
