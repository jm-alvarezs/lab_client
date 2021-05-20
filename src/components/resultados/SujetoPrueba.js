import React from "react";

const SujetoPrueba = ({ patient }) => {
  const {
    name,
    email,
    birthDate,
    gender,
    antecedent,
    dominantHand,
    drugsConsumption,
    whichDrugs,
    durgsTreatment,
    dose,
    damageLocation,
  } = patient;
  return (
    <div>
      <h4>{name}</h4>
      <p>{email}</p>
      <p>Género: {gender}</p>
      <p>Fecha de Nacimiento: {moment(birthDate).format("DD MMM YYYY")}</p>
      <label>Antecedentes:</label>
      <p>{antecedent}</p>
      <p>Mano Dominante: {dominantHand}</p>
      <p>Consumo de Drogas: {drugsConsumption}</p>
      <p>Drogas: {whichDrugs}</p>
      <p>Tratamiento: {durgsTreatment}</p>
      <p>Dosis: {dose}</p>
      <p>Ubicación del Daño: {damageLocation}</p>
    </div>
  );
};

export default SujetoPrueba;
