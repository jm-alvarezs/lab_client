import api from "./api";

const route = "/surveys";

export default {
  getSurveys: () => api.get(route),
  getSurveysAdmin: () => api.get(`${route}?admin=true`),
  getSingleSurvey: (id) => api.get(`${route}/${id}`),
  fetchSurveys: (idPatient, idSurveyType, startDate, endDate) =>
    api.get(
      `${route}/search?idPatient=${idPatient}&type=${idSurveyType}&startDate=${startDate}&endDate=${endDate}`
    ),
  postSurvey: (survey) => api.post(route, { ...survey }),
  postAnswer: (survey, token) =>
    api.post(
      `${route}/answer`,
      { ...survey },
      {
        headers: {
          Authorization: token,
        },
      }
    ),
};
