import { Link } from "@reach/router";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import DamageForm from "../components/damages/DamageForm";
import { ModalContext } from "../context/ModalContext";
import { PacientesContext } from "../context/PacientesContext";
import { AuthContext } from "../context/AuthContext";
import { validateEmail } from "../utils";

const UsuarioForm = ({ id }) => {
  const {
    spinner,
    paciente,
    getSinglePaciente,
    createPaciente,
    setPropiedadPaciente,
    updatePaciente,
    postPaciente,
    createDamage,
    deleteDamage,
    setDamageLocation,
  } = useContext(PacientesContext);

  const { alert } = useContext(ModalContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isNaN(id)) {
      createPaciente();
    } else {
      getSinglePaciente(id);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paciente.name === "") {
      return alert("El nombre no puede estar vacío.");
    }
    if (!validateEmail(paciente.email)) {
      return alert("El correo electrónico no es válido.");
    }
    if (paciente.id === "nuevo") {
      paciente.idUser = user.id;
      if (paciente.antecedent === "") {
        paciente.antecedent = "Ninguno.";
      }
      if (paciente.whichDrugs === "") {
        paciente.whichDrugs = "Ninguno.";
      }
      if (paciente.drugsConsumption === "") {
        paciente.drugsConsumption = "Ninguno.";
      }
      postPaciente(paciente);
    } else {
      updatePaciente(paciente);
    }
  };

  const renderDamages = () => {
    if (paciente && paciente !== null) {
      let damages = paciente.damages;
      damages = damages.filter((damage) => !String(damage.id).includes("d"));
      return damages.map(({ id, damageLocation }) => (
        <DamageForm
          key={id}
          id={id}
          damageLocation={damageLocation}
          deleteDamage={deleteDamage}
          modifier={(damageLocation) => setDamageLocation(id, damageLocation)}
        />
      ));
    }
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
                onChange={(e) => setPropiedadPaciente("name", e.target.value)}
              />
            </div>
          </div>

          <label>Correo</label>
          <input
            type="text"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setPropiedadPaciente("email", e.target.value)}
          />
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control mb-3"
            value={moment(birthDate).utc().format("YYYY-MM-DD")}
            onChange={(e) => setPropiedadPaciente("birthDate", e.target.value)}
          />
          <label>Género</label>
          <select
            className="form-control mb-3"
            value={gender}
            onChange={(e) => setPropiedadPaciente("gender", e.target.value)}
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
              setPropiedadPaciente("dominantHand", e.target.value)
            }
          >
            <option>Diestro</option>
            <option>Zurdo</option>
            <option>Ambidiestro</option>
          </select>
          {renderDamages()}
          <button
            className="btn btn-outline-dark mb-4"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              createDamage();
            }}
          >
            + Daño
          </button>
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
              setPropiedadPaciente(
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
            onChange={(e) => setPropiedadPaciente("antecedent", e.target.value)}
          />
          <div className="row">
            <div className="col-12 col-md-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={spinner}
              >
                {spinner ? <div className="spinner-border"></div> : "Guardar"}
              </button>
            </div>
            <div className="col-12 col-md-6 text-end">
              {!spinner && (
                <Link className="btn btn-link text-danger" to="/pacientes">
                  Cancelar
                </Link>
              )}
            </div>
          </div>
        </>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <form className="container card p-4 shadow-sm my-4" onSubmit={handleSubmit}>
      <h1 className="h3 bold border-bottom mb-3 pb-3">
        {isNaN(id) ? "Agregar" : "Editar"} Paciente
      </h1>
      {renderForm()}
    </form>
  );
};

export default UsuarioForm;
