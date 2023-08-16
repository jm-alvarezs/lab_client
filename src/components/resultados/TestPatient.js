import React from "react";
import moment from "moment";

const TestPatient = ({ patient }) => {
  const renderDamages = () => {
    if (Array.isArray(patient.damages)) {
      if (patient.damages.length === 0) {
        return <p>No hay daños registrados.</p>;
      }
      return patient.damages.map(({ id, damageLocation }) => (
        <p key={id}>{damageLocation.split("_").join(" ")}</p>
      ));
    }
  };

  const {
    name,
    email,
    birthDate,
    gender,
    antecedent,
    dominantHand,
    whichDrugs,
  } = patient;
  return (
    <div className="row">
      <div className="col-12">
        <h4>{name}</h4>
        <p>{email}</p>
        <p>Género: {gender}</p>
        <p>
          Fecha de Nacimiento: {moment(birthDate).utc().format("DD MMM YYYY")}
        </p>
        <p>Mano Dominante: {dominantHand}</p>
        <p>Tratamiento Médico/Consumo de Drogas: {whichDrugs}</p>
      </div>
      <div className="col-12">
        <h4>Antecedentes:</h4>
        <p>{antecedent}</p>
      </div>
      <div className="col-12">
        <h4>Daños y Ubicaciones:</h4>
        {renderDamages()}
      </div>
    </div>
  );
};

export default TestPatient;
