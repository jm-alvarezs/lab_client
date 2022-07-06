import React from "react";

const MultiTestInstructions = ({ handleNext }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6 border-right shadow bg-light">
          <div className="row align-items-center vh-100">
            <div className="p-5">
              <h1>Bienvenido</h1>
              <p className="instrucciones">
                A continuación realizarás una serie de ejercicios, te tomará
                aproximadamente 10 minutos.
              </p>
              <button className="btn btn-dark" onClick={handleNext}>
                Comenzar
              </button>
            </div>
          </div>
        </div>
        <div className="col col-md-6 px-0">
          <img
            src="https://www.udem.edu.mx/sites/default/files/inline-images/Entropia-UDEM.jpg"
            className="half-image"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiTestInstructions;
