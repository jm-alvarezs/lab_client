import React from "react";
import moment from "moment";

const UsuarioData = ({ usuario }) => {
  const renderDamages = () => {
    if (Array.isArray(usuario.damages)) {
      if (usuario.damages.length === 0) {
        return <p>No hay daños registrados.</p>;
      }
      return usuario.damages.map(({ id, damageLocation }) => (
        <p key={id} className="damage-item">
          {damageLocation.split("_").join(" ")}
        </p>
      ));
    }
  };

  const {
    name,
    email,
    birthDate,
    gender,
    dominantHand,
    antecedent,
    whichDrugs,
  } = usuario;
  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <p>Nombre: {name}</p>
        <p>Correo: {email}</p>
        <p>
          Fecha de Nacimiento: {moment(birthDate).utc().format("DD MMM YYYY")}
        </p>
        <p>Género: {gender}</p>
      </div>
      <div className="col-12 col-md-6">
        <p>Edad: {moment().diff(moment(birthDate).utc(), "years")} años</p>
        <p>Mano Dominante: {dominantHand}</p>
        <p>Antecedentes: {antecedent}</p>
        <p>Drogas o Medicamentos: {whichDrugs}</p>
      </div>
      <div className="col-12">
        <h4>Daños</h4>
        {renderDamages()}
      </div>
    </div>
  );
};

export default UsuarioData;
