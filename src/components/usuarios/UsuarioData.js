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
    <div>
      <p>Nombre: {name}</p>
      <p>Correo: {email}</p>
      <p>Fecha de Nacimiento: {moment(birthDate).format("DD MMM YYYY")}</p>
      <p>Género: {gender}</p>
      <p>Mano Dominante: {dominantHand}</p>
      <p>Ubicación del Daño: {damageLocation}</p>
      <p>Antecedentes: {antecedent}</p>
      <p>Consumo de Drogas: {drugsConsumption}</p>
      <p>Tratamiento de Drogas: {drugsTreatment}</p>
      <p>Drogas o Medicamentos: {whichDrugs}</p>
      <p>Dosis: {dose}</p>
    </div>
  );
};

export default UsuarioData;
