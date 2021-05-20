import api from "./api";

const route = "/emails";

export default {
  postEmail: (id, type, email) => api.post(route, { id, type, email }),
};
