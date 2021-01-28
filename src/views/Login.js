import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "@reach/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6 h-100 bg-black">
          <img src="" className="login-img" />
        </div>
        <div className="col col-md-6 h-100">
          <div className="row align-items-center h-100">
            <div className="container-fluid">
              <h1 className="text-center mb-4">Ingresar</h1>
              <div className="card shadow-sm p-4 form-card">
                <form onSubmit={handleSubmit}>
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    value="Ingresar"
                  />
                </form>
                <p className="mb-0 mt-4">
                  ¿Aún no tienes cuenta?{" "}
                  <Link to="/registro">Crea tu cuenta</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
