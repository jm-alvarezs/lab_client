import React from "react";
import moment from "moment";

const UsuarioData = ({ usuario }) => {
  const renderDamages = () => {
    if (Array.isArray(usuario.damages)) {
      return usuario.damages.map(({ id, damageLocation }) => (
        <p key={id}>{damageLocation.split("_").join(" ")}</p>
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
        <p>Fecha de Nacimiento: {moment(birthDate).format("DD MMM YYYY")}</p>
        <p>Género: {gender}</p>
      </div>
      <div className="col-12 col-md-6">
        <p>Edad: {moment().diff(birthDate, "years")}</p>
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
