import React, { useContext, useEffect, useState } from "react";
import PreguntasCUPOM from "../components/cuestionario/PreguntasCUPOM";
import PreguntasNechapi from "../components/cuestionario/PreguntasNechapi";
import { PacientesContext } from "../context/PacientesContext";
import { SurveyContext } from "../context/SurveyContext";
import { UserContext } from "../context/UserContext";

const Cuestionario = ({ tipo, idPaciente }) => {
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState("");
  const [relacion, setRelacion] = useState("familiar-directo");
  const [observacones, setObservacones] = useState("");

  const { user } = useContext(UserContext);

  const { paciente, getSinglePaciente } = useContext(PacientesContext);

  const { postSurvey } = useContext(SurveyContext);

  useEffect(() => {
    getSinglePaciente(idPaciente);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postSurvey({
      idPatient: idPaciente,
      idSurveyType: tipo === "nechapi" ? 1 : 2,
    });
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
          <hr />
          <button className="btn btn-dark">Crear Cuestionario</button>
        </form>
      </div>
    </div>
  );
};

export default Cuestionario;
