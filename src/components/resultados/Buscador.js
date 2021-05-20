import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { PacientesContext } from "../../context/PacientesContext";
import { ResultadosContext } from "../../context/ResultadosContext";
import { searchRows } from "../../utils";

const Buscador = ({ survey }) => {
  const [query, setQuery] = useState("");
  const [patient, setPatient] = useState("");
  const [type, setType] = useState(1);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(
    moment().add(1, "days").format("YYYY-MM-DD")
  );

  const { fetchResults } = useContext(ResultadosContext);
  const { pacientes, getPacientes } = useContext(PacientesContext);

  useEffect(() => {
    getPacientes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults(patient, type, startDate);
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
          <p>
            <b>Paciente:</b> {selected.name}
          </p>
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
          <input
            type="text"
            className="form-control mb-3"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
                <option value="1">Nechapi</option>
                <option value="2">CUPOM</option>
              </>
            ) : (
              <>
                <option value="1">Atención Simple</option>
                <option value="2">Atención Condicional</option>
                <option value="3">Atención Condicional</option>
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

          <button type="submit" className="btn btn-dark w-100 mt-2">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Buscador;
