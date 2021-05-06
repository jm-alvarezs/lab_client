import api from "./api";

const route = "/surveys";

export default {
  getSurveys: () => api.get(route),
  getSuvrey: (id) => api.get(`${route}/${id}`),
  postSurvey: (survey) => api.post(route, { ...survey }),
};
