import React from "react";
import moment from "moment";

const UsuarioData = ({ usuario }) => {
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
    <div className="row">
      <div className="col-12 col-md-6">
        <p>Nombre: {name}</p>
        <p>Correo: {email}</p>
        <p>Fecha de Nacimiento: {moment(birthDate).format("DD MMM YYYY")}</p>
        <p>Género: {gender}</p>
        <p>Mano Dominante: {dominantHand}</p>
      </div>
      <div className="col-12 col-md-6">
        <p>Ubicación del Daño: {damageLocation}</p>
        <p>Antecedentes: {antecedent}</p>
        <p>Drogas o Medicamentos: {whichDrugs}</p>
      </div>
    </div>
  );
};

export default UsuarioData;
