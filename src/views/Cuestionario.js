import React, { useContext, useEffect } from "react";
import Breadcrumbs from "../components/global/Breadcrumbs";
import { PacientesContext } from "../context/PacientesContext";
import { SurveyContext } from "../context/SurveyContext";
import { UserContext } from "../context/UserContext";

const Cuestionario = ({ tipo, idPaciente }) => {
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
    <div className="container pb-4">
      <Breadcrumbs
        elements={[
          { name: "Pacientes", href: "/pacientes" },
          {
            name: paciente && paciente !== null ? paciente.name : "Paciente",
            href: `/pacientes/${idPaciente}`,
          },
        ]}
      />
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
          <button className="btn btn-primary ml-3">Crear Cuestionario</button>
        </form>
      </div>
    </div>
  );
};

export default Cuestionario;
