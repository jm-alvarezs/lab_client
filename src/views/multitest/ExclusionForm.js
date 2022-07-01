import React from "react";
import SingleQuestion from "./SingleQuestion";

const questions = [
  "¿Ha sido diagnosticado con algún trastorno psicológico?",
  "¿Actualmente está bajo algún tipo de tratamiento farmacológico para su estado mental?",
  "¿Consume regularmente (una vez a la semana) alcohol, marihuana, anfetaminas, cocaína...?",
  "¿Ha sufrido algún accidente Neurológico?",
];

const ExclusionForm = ({ callback, modifier }) => {
  return (
    <div className="container-fluid p-5 bg-light vh-100">
      <div className="container card p-4 shadow-sm">
        <h1 className="h4">Cuestionario previo</h1>
        {questions.map((question, index) => (
          <SingleQuestion
            modifier={(value) => modifier(index, value)}
            label={question}
          />
        ))}
        <button className="btn btn-dark mt-4" onClick={callback}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ExclusionForm;
