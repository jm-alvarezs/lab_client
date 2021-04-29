import api from "./api";

const route = "/tests";

export default {
  getResultados: () => api.get(`${route}`),
  fetchResults: (idPatient, idTestType, date) =>
    api.get(
      `${route}/search?idPatient=${idPatient}&type=${idTestType}&date=${date}`
    ),
  getSingleTest: (id) => api.get(`${route}/${id}`),
};
