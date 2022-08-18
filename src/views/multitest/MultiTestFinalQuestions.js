import React from "react";
import SingleQuestion from "./SingleQuestion";

const MultiTestFinalQuestions = ({ questions, callback, modifier }) => {
  return (
    <div className="container-fluid p-5 bg-light vh-100">
      <div className="container card p-4 shadow-sm">
        <h1 className="h4">Cuestionario Posterior</h1>
        {questions.map((question, index) => (
          <SingleQuestion
            key={index}
            label={question}
            modifier={(value) => modifier(index, value)}
          />
        ))}
        <button className="btn btn-dark mt-4" onClick={callback}>
          Terminar
        </button>
      </div>
    </div>
  );
};

export default MultiTestFinalQuestions;
