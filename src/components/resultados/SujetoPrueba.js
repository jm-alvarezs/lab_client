import React from "react";
import moment from "moment";

const SujetoPrueba = ({ patient }) => {
  const {
    name,
    email,
    birthDate,
    gender,
    antecedent,
    dominantHand,
    whichDrugs,
    damageLocation,
  } = patient;
  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <h4>{name}</h4>
        <p>{email}</p>
        <p>Género: {gender}</p>
        <p>Fecha de Nacimiento: {moment(birthDate).format("DD MMM YYYY")}</p>
      </div>
      <div className="col-12 col-md-6">
        <h4>Antecedentes:</h4>
        <p>{antecedent}</p>
        <p>Mano Dominante: {dominantHand}</p>
        <p>Tratamiento Médico/Consumo de Drogas: {whichDrugs}</p>
        <p>Ubicación del Daño: {damageLocation}</p>
      </div>
    </div>
  );
};

export default SujetoPrueba;
