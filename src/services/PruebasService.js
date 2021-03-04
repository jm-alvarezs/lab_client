import { getArgs } from "../utils";
import api from "./api";

const route = "/pruebas";

export default {
  getPruebas: () => api.get(route),
  getPrueba: (args) => api.get(`${route}${getArgs(args)}`),
  postPrueba: (args) => api.post(route, { ...args }),
  postResultados: (resultados) => api.post("/results", { ...resultados }),
};
