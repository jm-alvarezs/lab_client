import React, { useContext, useEffect, useState } from "react";
import { PacientesContext } from "../context/PacientesContext";
import { ResultadosContext } from "../context/ResultadosContext";
import { searchRows } from "../utils";
import moment from "moment";
import { Link } from "@reach/router";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [patient, setPatient] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(1);
  const [date, setDate] = useState("");

  const { pacientes, getPacientes } = useContext(PacientesContext);
  const { resultados, fetchResults } = useContext(ResultadosContext);

  useEffect(() => {
    getPacientes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults(patient, type, date);
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

  const renderResultados = () => {
    if (resultados && resultados !== null) {
      if (resultados.length === 0) {
        return <p>No hay resultados para pruebas con esa búsqueda.</p>;
      }
      return (
        <div className="mt-3 pb-4">
          <h2 className="border-bottom pb-3 mb-3">Resultados</h2>
          {resultados.map((resultado) => (
            <div key={resultado.id} className="card my-2 p-3 shadow-sm">
              <div className="row">
                <div className="col col-md-6">
                  <p>
                    {moment(resultado.createdAt).format("DD MMM YYYY HH:mm")}
                  </p>
                </div>
                <div className="col col-md-6 text-right">
                  <Link
                    to={`./${resultado.id}`}
                    className="btn btn-outline-secondary"
                  >
                    <i className="fa fa-eye"></i> Consultar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="container">
      <h1 className="border-bottom pb-3 mb-3">Buscador</h1>
      <div className="card p-3">
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
          <label>Tipo de Prueba</label>
          <select
            className="form-control mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="1">Atención Simple</option>
            <option value="2">Atención Condicional</option>
          </select>
          <label>Fecha de la Prueba</label>
          <input
            type="date"
            className="form-control mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="btn btn-dark w-100 mt-2">
            Buscar
          </button>
        </form>
      </div>
      {renderResultados()}
    </div>
  );
};

export default SearchResults;
