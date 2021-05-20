import api from "./api";

const route = "/usuario";

const UsuarioService = {
  getUsuario: () => api.get(route),
  getUsuariosAdmin: () => api.get("/users/all"),
  putUsuario: (usuario) => api.put("/users", { ...usuario }),
  setToken: (token) => (api.defaults.headers.common["Authorization"] = token),
  postUsuario: (nombre, correo, telefono, uid) =>
    api.post("/signup", { nombre, correo, telefono, uid }),
  deleteUsuario: (id) => api.delete(`/users/${id}`),
};

export default UsuarioService;
