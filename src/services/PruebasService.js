import api from "./api";

const route = "/tests";

export default {
  getPruebas: () => api.get(route),
  getPrueba: (idTest, config) => api.get(`${route}/${idTest}`, { ...config }),
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
