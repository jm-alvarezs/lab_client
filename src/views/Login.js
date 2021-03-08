import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "@reach/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { spinner, signIn } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 col-md-6 h-100 bg-black pl-0 pr-0 hide-mobile">
          <img
            src="https://images.unsplash.com/photo-1612967302509-244bef8964c2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80"
            className="login-img mw-100 w-100 h-100"
            alt="login"
          />
        </div>
        <div className="col-12 col-md-6 h-100">
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
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    value="Ingresar"
                  >
                    {spinner ? (
                      <div className="spinner-border"></div>
                    ) : (
                      "Ingresar"
                    )}
                  </button>
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
