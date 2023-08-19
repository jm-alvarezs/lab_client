import React, { useContext, useEffect, useState } from "react";
import { PacientesContext } from "../context/PacientesContext";
import StickyHeadTable from "../components/global/StickyHeadTable";
import { searchRows } from "../utils";
import { Link } from "@reach/router";

const columns = [
  { id: "id", label: "#ID" },
  {
    id: "name",
    label: "Name",
    minWidth: 150,
    component: (props) => (
      <Link to={`/patients/${props.id}`}>{props.name}</Link>
    ),
  },
  { id: "email", label: "Email", minWidth: 250 },
];

const Pacientes = () => {
  const [query, setQuery] = useState("");

  const { pacientes, getPacientes, clearPaciente } =
    useContext(PacientesContext);

  useEffect(() => {
    clearPaciente();
    getPacientes();
  }, []);

  const renderUsuarios = () => {
    if (Array.isArray(pacientes)) {
      let usuariosRender = [...pacientes];
      if (query !== "") {
        usuariosRender = searchRows(query, usuariosRender);
      }
      return <StickyHeadTable columns={columns} rows={usuariosRender} />;
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container">
      <div className="row mx-0 border-bottom pb-3 mb-3 mt-4 align-items-center">
        <div className="col-6 px-0">
          <h1>Pacientes</h1>
        </div>
        <div className="col-6 text-end px-0">
          <Link to="/patients/nuevo/edit" className="btn btn-primary">
            + Agregar
          </Link>
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o correo electrónico.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {renderUsuarios()}
    </div>
  );
};

export default Pacientes;
