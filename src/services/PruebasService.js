import { getArgs } from "../utils";
import api from "./api";

const route = "/tests";

export default {
  getPruebas: () => api.get(route),
  getPrueba: (idTest) => api.get(`${route}/${idTest}`),
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
};
