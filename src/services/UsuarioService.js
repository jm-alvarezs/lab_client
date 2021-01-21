import api from "./api";

const route = "/usuario";

const UsuarioService = {
  getUsuario: () => api.get(route),
  putUsuario: (usuario) => api.put(route, { ...usuario }),
  setToken: (token) => (api.defaults.headers.common["Authorization"] = token),
  postUsuario: (nombre, correo, telefono, uid) =>
    api.post("/signup", { nombre, correo, telefono, uid }),
};

export default UsuarioService;
