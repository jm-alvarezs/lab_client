import api from "./api";

const route = "/surveys";

export default {
  getSurveys: () => api.get(route),
  getSingleSurvey: (id) => api.get(`${route}/${id}`),
  postSurvey: (survey) => api.post(route, { ...survey }),
  postAnswer: (survey) => api.post(`${route}/answer`, { ...survey }),
};
