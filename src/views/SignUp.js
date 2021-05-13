import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { navigate } from "@reach/router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [institution, setInstitution] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { created, signUp } = useContext(UserContext);

  useEffect(() => {
    if (created) {
      navigate("/");
    }
  }, [created]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(
      name,
      profession,
      email,
      institution,
      birthdate,
      country,
      scholarship,
      password
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6 vh-100 pl-0">
          <img
            src="https://www.udem.edu.mx/sites/default/files/inline-images/Entropia-UDEM.jpg"
            className="login-img mw-100 w-100 vh-100"
            alt="login"
          />
        </div>
        <div className="col col-md-6 vh-100">
          <div className="row align-items-center vh-100">
            <div className="container-fluid">
              <h1 className="text-center mb-4">Registrate</h1>
              <div className="card shadow-sm p-3">
                <form onSubmit={handleSubmit}>
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                  <label>Profession</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                  <label>Institución</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                  />
                  <label>Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control mb-3"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                  <label>País</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <label>Nivel Educativo</label>
                  <select
                    className="form-control mb-3"
                    onChange={(e) => setScholarship(e.target.value)}
                  >
                    <option value="Preparatoria">Preparatoria</option>
                    <option value="Universidad">Universidad</option>
                    <option value="Maestria">Maestría</option>
                    <option value="Doctorado">Doctorado</option>
                  </select>
                  <input
                    type="submit"
                    className="btn btn-dark btn-block"
                    value="Registrarme"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
