import React from "react";

const UsuarioForm = ({ usuario, setPropiedadUsuario, cancel }) => {
  const {
    name,
    email,
    birthDate,
    gender,
    dominantHand,
    damageLocation,
    antecedent,
    drugsConsumption,
    drugsTreatment,
    whichDrugs,
    dose,
  } = usuario;
  return (
    <form>
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
      <input
        type="text"
        className="form-control mb-3"
        value={gender}
        onChange={(e) => setPropiedadUsuario("gender", e.target.value)}
      />
      <label>Mano Dominante</label>
      <input
        type="text"
        className="form-control mb-3"
        value={dominantHand}
        onChange={(e) => setPropiedadUsuario("dominantHand", e.target.value)}
      />
      <label>Ubicación del Daño</label>
      <input
        type="text"
        className="form-control mb-3"
        value={damageLocation}
        onChange={(e) => setPropiedadUsuario("damageLocation", e.target.value)}
      />
      <label>Antecedentes</label>
      <input
        type="text"
        className="form-control mb-3"
        value={antecedent}
        onChange={(e) => setPropiedadUsuario("antecedent", e.target.value)}
      />
      <label>Consumo de Drogas</label>
      <input
        type="text"
        className="form-control mb-3"
        value={drugsConsumption}
        onChange={(e) =>
          setPropiedadUsuario("drugsConsumption", e.target.value)
        }
      />
      <label>Tratamiento de Drogas</label>
      <input
        type="text"
        className="form-control mb-3"
        value={drugsTreatment}
        onChange={(e) => setPropiedadUsuario("drugsTreatment", e.target.value)}
      />
      <label>Drogas o Medicamentos</label>
      <input
        type="text"
        className="form-control mb-3"
        value={whichDrugs}
        onChange={(e) => setPropiedadUsuario("whichDrugs", e.target.value)}
      />
      <label>Dosis</label>
      <input
        type="text"
        className="form-control mb-3"
        value={dose}
        onChange={(e) => setPropiedadUsuario("dose", e.target.value)}
      />
      <div className="row">
        <div className="col-12 col-md-6">
          <button type="submit" className="btn btn-primary">
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
