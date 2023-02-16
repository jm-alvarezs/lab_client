import api from "./api";

const route = "/tests";

export default {
  getPruebas: () => api.get(route),
  getPrueba: (idTest, config) =>
    api.get(`${route}/single/${idTest}`, { ...config }),
  getNechapi: (idPatient, method) =>
    api.get(`${route}/patient/${idPatient}?method=${method}`),
  postPrueba: (args) => api.post(route, { ...args }),
  postResultados: (resultados) =>
    api.post(
      `${route}/results`,
      { ...resultados },
      {
        headers: {
          Authorization: resultados.token,
        },
      }
    ),
  putResultados: (idTest, rule) =>
    api.put(`${route}/results`, { idTest, rule }),
};
