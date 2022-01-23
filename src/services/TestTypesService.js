import api from "./api";

const route = "/testTypes";

export default {
  getTestTypes: () => api.get(route),
};
