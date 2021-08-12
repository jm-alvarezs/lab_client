import { Link } from "@reach/router";
import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { PacientesContext } from "../context/PacientesContext";
import { secciones } from "../utils";

const UsuarioForm = ({ id }) => {
  const [location, setLocation] = useState("corteza");
  const [section, setSection] = useState("");
  const [side, setSide] = useState("derecho");

  const {
    paciente,
    getSinglePaciente,
    createPaciente,
    setPropiedadUsuario,
    updatePaciente,
    postPaciente,
  } = useContext(PacientesContext);

  useEffect(() => {
    if (isNaN(id)) {
      createPaciente();
    } else {
      getSinglePaciente(id);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...paciente,
      damageLocation: `${location}_${section}_${side}`,
    };
    if (paciente.id === "nuevo") {
      postPaciente(data);
    } else {
      updatePaciente(data);
    }
  };

  const renderSecciones = () => {
    const seccion = secciones[location];
    if (seccion)
      return seccion.options.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ));
  };

  const renderForm = () => {
    if (paciente && paciente !== null) {
      const {
        name,
        email,
        birthDate,
        gender,
        dominantHand,
        antecedent,
        whichDrugs,
        drugsConsumption,
      } = paciente;
      return (
        <>
          <div className="row">
            <div className="container-fluid">
              <label>Nombre Completo</label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setPropiedadUsuario("name", e.target.value)}
              />
            </div>
          </div>

          <label>Correo</label>
          <input
            type="text"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setPropiedadUsuario("email", e.target.value)}
          />
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control mb-3"
            value={moment(birthDate).utc().format("YYYY-MM-DD")}
            onChange={(e) => setPropiedadUsuario("birthDate", e.target.value)}
          />
          <label>Género</label>
          <select
            className="form-control mb-3"
            value={gender}
            onChange={(e) => setPropiedadUsuario("gender", e.target.value)}
          >
            <option>Hombre</option>
            <option>Mujer</option>
            <option>Otros</option>
          </select>
          <label>Mano Dominante</label>
          <select
            className="form-control mb-3"
            value={dominantHand}
            onChange={(e) =>
              setPropiedadUsuario("dominantHand", e.target.value)
            }
          >
            <option>Diestro</option>
            <option>Zurdo</option>
            <option>Ambidiestro</option>
          </select>
          <label>Ubicación del Daño</label>
          <select
            className="form-control mb-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="corteza">Corteza</option>
            <option value="subcorteza">Subcorteza</option>
            <option value="tronco">Tronco del Encéfalo</option>
            <option value="cerebelo">Cerebelo</option>
            <option value="lobulos">Lóbulos</option>
          </select>
          <div className="row">
            <div
              className={
                secciones[location].has_side &&
                section !== "hipotalamo" &&
                section !== "glandula"
                  ? "col-6"
                  : "col-12"
              }
            >
              <select
                className="form-control mb-3"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                {renderSecciones()}
              </select>
            </div>
            {secciones[location].has_side &&
              section !== "hipotalamo" &&
              section !== "glandula" && (
                <div className="col-6">
                  <select
                    className="form-control mb-3"
                    value={side}
                    onChange={(e) => setSide(e.target.value)}
                  >
                    <option>Derecho</option>
                    <option>Izquierdo</option>
                    <option>Bihemisférico</option>
                  </select>
                </div>
              )}
          </div>
          <label>Tratamiento Médico / Consumo de Drogas</label>
          <textarea
            rows="4"
            className="form-control mb-3"
            value={
              typeof drugsConsumption === "boolean"
                ? whichDrugs
                : drugsConsumption
            }
            onChange={(e) =>
              setPropiedadUsuario(
                typeof drugsConsumption === "boolean"
                  ? "whichDrugs"
                  : "drugsConsumption",
                e.target.value
              )
            }
          />
          <label>Antecedentes</label>
          <textarea
            rows="4"
            className="form-control mb-3"
            value={antecedent}
            onChange={(e) => setPropiedadUsuario("antecedent", e.target.value)}
          />
          <div className="row">
            <div className="col-12 col-md-6">
              <button type="submit" className="btn btn-dark">
                Guardar
              </button>
            </div>
            <div className="col-12 col-md-6 text-right">
              <Link className="btn btn-link text-danger" to="/pacientes">
                Cancelar
              </Link>
            </div>
          </div>
        </>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <form className="card p-4 shadow-sm my-4" onSubmit={handleSubmit}>
      <h1 className="h3 bold border-bottom mb-3 pb-3">
        {isNaN(id) ? "Agregar" : "Editar"} Paciente
      </h1>
      {renderForm()}
    </form>
  );
};

export default UsuarioForm;
