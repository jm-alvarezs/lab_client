import React from "react";
import SingleQuestion from "./SingleQuestion";

const ExclusionForm = ({ callback }) => {
  return (
    <div className="container-fluid p-5 bg-light vh-100">
      <div className="container card p-4 shadow-sm">
        <h1>Cuestionario previo</h1>
        <SingleQuestion label="¿Ha sido diagnosticado con algún trastorno psicológico?" />
        <SingleQuestion label="¿Actualmente está bajo algún tipo de tratamiento farmacológico para su estado mental?" />
        <SingleQuestion label="¿Consume regularmente (una vez a la semana) alcohol, marihuana, anfetaminas, cocaína...?" />
        <SingleQuestion label="¿Ha sufrido algún accidente Neurológico?" />
        <button className="btn btn-dark mt-4" onClick={callback}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ExclusionForm;
