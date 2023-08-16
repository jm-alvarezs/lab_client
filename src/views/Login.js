import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "@reach/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { spinner, signIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="col-12 col-md-6 vh-100 ps-0 pe-0 hide-mobile">
          <img
            src="https://www.udem.edu.mx/sites/default/files/inline-images/Entropia-UDEM.jpg"
            className="login-img mw-100 w-100 vh-100"
            alt="login"
          />
        </div>
        <div className="col-12 col-md-6 vh-100">
          <div className="row align-items-center vh-100">
            <div className="container-fluid">
              <h1 className="text-center form-card h2 mb-5 bold">
                Laboratorio de Cognición de la Universidad de Monterrey
              </h1>
              <h2 className="text-center h4 mb-4">Ingresar</h2>
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
