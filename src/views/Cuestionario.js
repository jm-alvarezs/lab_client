import React, { useState } from "react";
import PreguntasCUPOM from "../components/cuestionario/PreguntasCUPOM";
import PreguntasNechapi from "../components/cuestionario/PreguntasNechapi";

const Cuestionario = ({ tipo }) => {
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState("");
  const [relacion, setRelacion] = useState("familiar-directo");
  const [observacones, setObservacones] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const postPreguntas = (preguntas) => {
    const req = {
      nombre,
      relacion,
      observacones,
      preguntas,
    };
    console.log(req);
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row my-2 mx-0">
          <div className="col-12 col-md-6">
            <label>Nombre</label>
          </div>
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </div>
        <div className="row my-2 mx-0">
          <div className="col-12 col-md-6">
            <label>Relación con el Paciente</label>
          </div>
          <div className="col-12 col-md-6">
            <select
              className="form-control"
              onChange={(e) => setRelacion(e.target.value)}
            >
              <option value="familiar-directo">
                Familiar directo que convive con el paciente.
              </option>
              <option value="pareja-estable">Novio(a) / Pareja Estable</option>
              <option value="amigo">Amigo(a)</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
        <div className="row my-2 mx-0">
          <div className="col-12 col-md-6">
            <label>Observaciones</label>
          </div>
          <div className="col-12 col-md-6">
            <textarea
              rows="4"
              className="form-control mw-100"
              onChange={(e) => setObservacones(e.target.value)}
            />
          </div>
        </div>
        <div className="container text-right mt-3">
          {step === 1 && (
            <button type="submit" className="btn btn-dark">
              Continuar
            </button>
          )}
        </div>
      </form>
    );
  };

  const renderPreguntas = () => {
    if (step > 1) {
      if (tipo === "CUPOM")
        return <PreguntasCUPOM postResultados={postPreguntas} />;
      return <PreguntasNechapi postResultados={postPreguntas} />;
    }
  };

  const renderPaciente = () => {
    return "Paco";
  };

  const renderEvaluador = () => {
    return "Umberto León";
  };

  return (
    <div className="container py-4">
      <h1 className="h2 mb-3">
        Cuestionario -{" "}
        {String(tipo)[0].toUpperCase() + String(tipo).substring(1)}
      </h1>
      <div className="card p-3">
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
        {renderForm()}
        {renderPreguntas()}
      </div>
    </div>
  );
};

export default Cuestionario;
