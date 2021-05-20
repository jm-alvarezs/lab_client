import React, { useContext, useEffect, useState } from "react";
import { PacientesContext } from "../context/PacientesContext";
import { SurveyContext } from "../context/SurveyContext";
import { UserContext } from "../context/UserContext";

const Cuestionario = ({ tipo, idPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [relacion, setRelacion] = useState("familiar");

  const { user } = useContext(UserContext);

  const { paciente, getSinglePaciente } = useContext(PacientesContext);

  const { postSurvey } = useContext(SurveyContext);

  useEffect(() => {
    getSinglePaciente(idPaciente);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postSurvey(
      {
        idPatient: idPaciente,
        idSurveyType: tipo === "nechapi" ? 1 : 2,
        name: nombre,
        lastName: apellidos,
        relationship: relacion,
      },
      paciente
    );
  };

  const renderPaciente = () => {
    if (paciente && paciente !== null) return paciente.name;
  };

  const renderEvaluador = () => {
    return user.name;
  };

  return (
    <div className="container py-4">
      <h1 className="h2 mb-3">
        Cuestionario -{" "}
        {String(tipo)[0].toUpperCase() + String(tipo).substring(1)}
      </h1>
      <div className="card p-3">
        <form onSubmit={handleSubmit}>
          <div className="row mx-0 mb-3">
            <div className="col-12 col-md-6">
              <p className="mb-0 bold">Evaluador</p>
            </div>
            <div className="col-12 col-md-6">
              <p className="mb-0">{renderEvaluador()}</p>
            </div>
          </div>
          <div className="row mx-0 mb-3">
            <div className="col-12 col-md-6">
              <p className="mb-0 bold">Paciente</p>
            </div>
            <div className="col-12 col-md-6">
              <p className="mb-0">{renderPaciente()}</p>
            </div>
          </div>
          <h4 className="px-3 mt-4">Datos del entrevistado/a</h4>
          <hr />
          <div className="row my-3 mx-0">
            <div className="col-6">
              <label>Nombre</label>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    value={nombre}
                    className="form-control"
                    placeholder="Nombre(s)"
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    value={apellidos}
                    className="form-control"
                    placeholder="Apellidos"
                    onChange={(e) => setApellidos(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3 mx-0">
            <div className="col-6">
              <label>Relación con el Paciente</label>
            </div>
            <div className="col-6">
              <select
                className="form-control"
                value={relacion}
                onChange={(e) => setRelacion(e.target.value)}
              >
                <option value="familiar">Familiar directo</option>
                <option value="pareja">Novio/a o pareja Estable</option>
                <option value="amigo">Amigo/a</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
          <button className="btn btn-dark ml-3">Crear Cuestionario</button>
        </form>
      </div>
    </div>
  );
};

export default Cuestionario;
