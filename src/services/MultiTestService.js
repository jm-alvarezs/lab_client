import api from "./api";

const route = "/multitests";

export default {
  getMultiTests: () => api.get(route),
  getSingleMultiTest: (idMultiTest) => api.get(`${route}/${idMultiTest}`),
  postMultiTest: (multitest) => api.post(route, { ...multitest }),
  putMultiTest: (multitest) => api.put(route, { ...multitest }),
  deleteMultiTest: (idMultiTest) => api.delete(`${route}/${idMultiTest}`),
};
