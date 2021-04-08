import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import moment from "moment";

const Cuenta = () => {
  const [editMode, setEditMode] = useState(false);
  const { user, signOut, updateUsuario, setPropiedadUser } = useContext(
    UserContext
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsuario(user);
    setEditMode(true);
  };

  const renderUser = () => {
    if (user && user !== null) {
      const {
        name,
        email,
        profession,
        institution,
        birthDate,
        country,
        scholarship,
      } = user;
      if (editMode) {
        return (
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <label>Nombre Completo</label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setPropiedadUser("name", e.target.value)}
              />
              <label>Correo Electrónico</label>
              <input
                type="email"
                className="form-control mb-3"
                value={email}
                onChange={(e) => setPropiedadUser("email", e.target.value)}
              />
              <label>Profession</label>
              <input
                type="text"
                className="form-control mb-3"
                value={profession}
                onChange={(e) => setPropiedadUser("Profession", e.target.value)}
              />
              <label>Institución</label>
              <input
                type="text"
                className="form-control mb-3"
                value={institution}
                onChange={(e) =>
                  setPropiedadUser("institution", e.target.value)
                }
              />
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control mb-3"
                value={birthDate}
                onChange={(e) => setPropiedadUser("birthDate", e.target.value)}
              />
              <label>País</label>
              <input
                type="text"
                className="form-control mb-3"
                value={country}
                onChange={(e) => setPropiedadUser("country", e.target.value)}
              />
              <label>Nivel Educativo</label>
              <select
                className="form-control mb-3"
                onChange={(e) =>
                  setPropiedadUser("scholarship", e.target.value)
                }
              >
                <option value="Preparatoria">Preparatoria</option>
                <option value="Universidad">Universidad</option>
                <option value="Maestria">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
              <button type="submit" className="btn btn-dark btn-block">
                Guardar
              </button>
            </form>
          </div>
        );
      }
      return (
        <div className="container-fluid">
          <h2>{name}</h2>
          <p>{email}</p>
          <p>{profession}</p>
          <p>{institution}</p>
          <p>{moment(birthDate).add(1, "day").format("DD MMM YYYY")}</p>
          <p>{country}</p>
          <p>{scholarship}</p>
          <div className="row">
            <div className="col col-md-6">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setEditMode(true)}
              >
                <i className="fa fa-edit"></i> Editar
              </button>
            </div>
            <div className="col col-md-6 text-right">
              <button className="btn btn-outline-danger" onClick={signOut}>
                Salir <i className="fa fa-sign-out-alt ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="container px-0">
        <h1>Mi Cuenta</h1>
        <div className="card p-3 shadow-sm">{renderUser()}</div>
      </div>
    </div>
  );
};

export default Cuenta;
