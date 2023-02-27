import api from "./api";
import { getArgs } from "../utils";

const route = "/tests";

export default {
  getResultados: (filters) => api.get(`${route}?${getArgs(filters)}`),
  getResultadosAdmin: () => api.get(`${route}?admin=true`),
  getSingleTest: (id) => api.get(`${route}/single/${id}`),
  getFiability: () => api.get(`${route}/fiability`),
};
