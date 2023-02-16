import React, { useContext, useEffect, useState } from "react";
import { PacientesContext } from "../../context/PacientesContext";
import { ResultadosContext } from "../../context/ResultadosContext";
import { SurveyContext } from "../../context/SurveyContext";
import { searchRows } from "../../utils";

const Buscador = ({ survey }) => {
  const [type, setType] = useState("");
  const [query, setQuery] = useState("");
  const [patient, setPatient] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const { spinner, getResultados } = useContext(ResultadosContext);
  const { fetchSurveys, getSurveyTypes } = useContext(SurveyContext);
  const { pacientes, getPacientes } = useContext(PacientesContext);

  useEffect(() => {
    getPacientes();
    getSurveyTypes();
  }, []);

  useEffect(() => {
    if (!spinner) {
      fetchData();
    }
  }, [patient, type, startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = () => {
    let service = getResultados;
    if (survey) {
      service = fetchSurveys;
    }
    service({ idPatient: patient, type, startDate, endDate });
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
          <div className="row align-items-center mx-0 bg-light border">
            <div className="col-10">
              <b>Paciente:</b> {selected.name}
            </div>
            <div className="col-2 text-end">
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

  const renderOptions = () => {
    if (survey) {
      return [
        <option key="todos" value="">
          Todos
        </option>,
        <option key="1" value="1">
          Nechapi
        </option>,
        <option key="2" value="2">
          CUPOM
        </option>,
      ];
    }
    return [
      <option key="todos" value="">
        Todos
      </option>,
      <option key="1" value="1">
        Atención Simple
      </option>,
      <option key="2" value="2">
        Atención Condicional
      </option>,
      <option key="3" value="3">
        Hemi Atención
      </option>,
      <option key="4" value="4">
        Torre de Hanoi
      </option>,
      <option key="5" value="5">
        Flanker Task
      </option>,
    ];
  };

  return (
    <div className="container-fluid px-0">
      <div className="card p-3">
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">
            <div className="col-12 col-md-4 mb-2">
              <label>Paciente</label>
              {patient === "" && (
                <input
                  type="text"
                  value={query}
                  className="form-control"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por #ID, nombre o email"
                />
              )}
              {renderSelected()}
            </div>
            <div className="col-12 col-md-3 mb-2">
              <label>Tipo de Ejercicio</label>
              <select
                value={type}
                className="form-control"
                onChange={(e) => setType(e.target.value)}
              >
                {renderOptions()}
              </select>
            </div>
            <div className="col-12 col-md-5 mb-2">
              <label>Prueba Realizada entre</label>
              <div className="row">
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4" style={{ marginTop: -16 }}>
            {renderPacientes()}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Buscador;
