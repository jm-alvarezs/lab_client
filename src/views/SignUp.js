import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, navigate } from "@reach/router";
import moment from "moment";
import axios from "axios";
import { BASE_URL, validateEmail } from "../utils";

const SignUp = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [institution, setInstitution] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("México");
  const [scholarship, setScholarship] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paises, setPaises] = useState([]);

  const { created, signUp, signIn } = useContext(UserContext);

  useEffect(() => {
    axios.get(`${BASE_URL}/countries`).then((res) => {
      setPaises(res.data.paises);
    });
  }, []);

  useEffect(() => {
    if (created) {
      signIn(email, password);
      navigate("/");
    }
  }, [created]);

  const renderPaises = () => {
    if (paises && paises !== null) {
      return paises.map(({ pais }) => <option value={pais}>{pais}</option>);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return alert("El correo no es válido.");
    }
    if (profession === "") {
      return alert("Profesion no puede estar vacío.");
    }
    if (password.length < 6) {
      return alert("La contraseña debe tener al menos 6 caracteres.");
    }
    if (institution === "") {
      return alert("La institución no puede estar vacía.");
    }
    if (!moment(birthdate).isValid()) {
      return alert("La fecha de nacimiento no es válida.");
    }
    if (moment().diff(moment(birthdate), "years") < 18) {
      return alert("Debes ser mayor de edad para registrarte.");
    }
    if (country === "") {
      return alert("El país no puede ser vacío");
    }
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
                  <label>Profesión</label>
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
                  <select
                    value={country}
                    className="form-control mb-3"
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {renderPaises()}
                  </select>
                  <label>Nivel Educativo</label>
                  <select
                    className="form-control mb-3"
                    onChange={(e) => setScholarship(e.target.value)}
                  >
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
                <p className="mt-3 mb-1">
                  ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
