import { Link } from "@reach/router";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import DamageForm from "../components/damages/DamageForm";
import { PacientesContext } from "../context/PacientesContext";

const UsuarioForm = ({ id }) => {
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
    if (paciente.id === "nuevo") {
      postPaciente(paciente);
    } else {
      updatePaciente(paciente);
    }
  };

  const renderDamages = () => {
    return console.log(paciente);
    return paciente.damages.map((damage) => (
      <DamageForm key={damage.id} damage={damage} />
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
          {renderDamages()}
          <button className="btn btn-outline-dark">+ Daño</button>
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
