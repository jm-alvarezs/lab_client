import React from "react";

const SplitHalfTesting = ({ average_one, average_two, result }) => {
  return (
    <div className="container px-0">
      <h2>Prueba de Fiabilidad</h2>
      <div className="row align-items-center my-2">
        <div className="col col-md-6">
          <label>1era Mitad</label>
        </div>
        <div className="col col-md-6">
          <label>{average_one} ms</label>
        </div>
      </div>
      <div className="row align-items-center my-2">
        <div className="col col-md-6">
          <label>2da Mitad</label>
        </div>
        <div className="col col-md-6">
          <label>{average_two} ms</label>
        </div>
      </div>
      <div className="row align-items-center my-2">
        <div className="col col-md-6">
          <label>Resultado</label>
        </div>
        <div className="col col-md-6">
          <label>{result} ms</label>
        </div>
      </div>
    </div>
  );
};

export default SplitHalfTesting;
