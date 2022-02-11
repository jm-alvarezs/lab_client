import api from "./api";

const route = "/payments";

export default {
  getMyPayments: () => api.get(route),
};
