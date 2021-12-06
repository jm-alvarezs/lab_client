import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { PacientesContext } from "../../context/PacientesContext";
import { ResultadosContext } from "../../context/ResultadosContext";
import { SurveyContext } from "../../context/SurveyContext";
import { searchRows } from "../../utils";

const Buscador = ({ survey }) => {
  const [query, setQuery] = useState("");
  const [patient, setPatient] = useState("");
  const [type, setType] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const { fetchResults } = useContext(ResultadosContext);
  const { fetchSurveys } = useContext(SurveyContext);
  const { pacientes, getPacientes } = useContext(PacientesContext);

  useEffect(() => {
    getPacientes();
  }, []);

  useEffect(() => {
    fetchData();
  }, [patient, type, startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = () => {
    let service = fetchResults;
    if (survey) {
      service = fetchSurveys;
    }
    service(patient, type, startDate, endDate);
  };

  const renderPacientes = () => {
    if (pacientes && pacientes !== null) {
      if (query !== "") {
        let pacientesRender = searchRows(query, pacientes);
        return pacientesRender.map((paciente) => (
          <li
            key={paciente.id}
            className="shadow-sm"
            style={{ listStyleType: "none" }}
          >
            <button
              className="btn btn-link dropdown-item"
              onClick={() => {
                setPatient(paciente.id);
                setQuery("");
              }}
            >
              #{paciente.id} - {paciente.name} - {paciente.email}
            </button>
          </li>
        ));
      }
    }
  };

  const renderSelected = () => {
    if (pacientes && pacientes !== null) {
      let selected = pacientes.find((paciente) => paciente.id === patient);
      if (selected) {
        return (
          <div className="row align-items-center p-1 mx-0 bg-light border">
            <div className="col-10">
              <b>Paciente:</b> {selected.name}
            </div>
            <div className="col-2 text-right">
              <button
                type="button"
                onClick={() => setPatient("")}
                className="btn btn-link text-dark"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="container">
      <div className="card p-3">
        <h2 className="border-bottom pb-3 mb-3 h3">Buscador</h2>
        <form onSubmit={handleSubmit}>
          <label>Paciente</label>
          {patient === "" && (
            <input
              type="text"
              className="form-control mb-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          {renderSelected()}
          <div className="pb-4" style={{ marginTop: -16 }}>
            {renderPacientes()}
          </div>
          <label>Tipo de Ejercicio</label>
          <select
            className="form-control mb-4"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {survey ? (
              <>
                <option value={null}>Todos</option>
                <option value="1">Nechapi</option>
                <option value="2">CUPOM</option>
              </>
            ) : (
              <>
                <option value={null}>Todos</option>
                <option value="1">Atención Simple</option>
                <option value="2">Atención Condicional</option>
                <option value="3">Hemi Atención</option>
                <option value="4">Torre de Hanoi</option>
                <option value="5">Flanker Task</option>
              </>
            )}
          </select>
          <label>Prueba Realizada entre</label>
          <div className="row">
            <div className="col-6">
              <input
                type="date"
                className="form-control mb-3"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-6">
              <input
                type="date"
                className="form-control mb-3"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Buscador;
