import api from "./api";

const route = "/adjuntos";

const AdjuntosService = {
  getAdjunto: () => api.get(route),
  postAdjunto: (formData) =>
    api.post(route, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default AdjuntosService;
