import React, { useContext, useState } from "react";
import { PacientesContext } from "../../context/PacientesContext";

const UsuarioForm = ({ usuario, setPropiedadUsuario, cancel }) => {
  const [location, setLocation] = useState("corteza");
  const [section, setSection] = useState("");
  const [side, setSide] = useState("derecho");

  const { updatePaciente, postPaciente } = useContext(PacientesContext);

  const secciones = {
    corteza: {
      has_side: true,
      options: [
        {
          name: "Lóbulo frontal",
          value: "frontal",
        },
        {
          name: "Lóbulo temporal",
          value: "temporal",
        },
        {
          name: "Lóbulo parietal",
          value: "parietal",
        },
        {
          name: "Lóbulo occipital",
          value: "occipital",
        },
      ],
    },
    subcorteza: {
      has_side: true,
      options: [
        {
          name: "Tálamo",
          value: "talamo",
        },
        {
          name: "Ganglios de la base",
          value: "ganglios",
        },
        {
          name: "Hipotálamo",
          value: "hipotalamo",
        },
        {
          name: "Glándula pineal",
          value: "glandula",
        },
      ],
    },
    tronco: {
      options: [
        {
          name: "Bulbo raquídeo",
          value: "bulbo",
        },
        {
          name: "Protuberancia",
          value: "protuberancia",
        },
        {
          name: "Mesencéfalo",
          value: "mesencefalo",
        },
      ],
    },
    cerebelo: {
      options: [
        {
          name: "Izquierdo",
          value: "izquierdo",
        },
        {
          name: "Derecho",
          value: "derecho",
        },
      ],
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...usuario,
      damageLocation: `${location}_${section}_${side}`,
    };
    if (usuario.id === "nuevo") {
      postPaciente(data);
    } else {
      updatePaciente(data);
    }
  };

  const renderSecciones = () => {
    const seccion = secciones[location];
    if (seccion)
      return seccion.options.map(({ name, value }) => (
        <option value={value}>{name}</option>
      ));
  };

  const {
    name,
    email,
    birthDate,
    gender,
    dominantHand,
    antecedent,
    drugsConsumption,
  } = usuario;
  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre</label>
      <input
        type="text"
        className="form-control mb-3"
        value={name}
        onChange={(e) => setPropiedadUsuario("name", e.target.value)}
      />
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
        value={birthDate}
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
        onChange={(e) => setPropiedadUsuario("dominantHand", e.target.value)}
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
              </select>
            </div>
          )}
      </div>
      <label>Consumo de Drogas/Medicamentos</label>
      <textarea
        rows="4"
        className="form-control mb-3"
        value={drugsConsumption}
        onChange={(e) =>
          setPropiedadUsuario("drugsConsumption", e.target.value)
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
          <button
            type="submit"
            className="btn btn-link text-danger"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              cancel();
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default UsuarioForm;
