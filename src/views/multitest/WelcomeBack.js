import React from "react";

const WelcomeBack = ({ patient, handleNext }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6 border-right shadow bg-light">
          <div className="row align-items-center vh-100">
            <div className="p-5">
              <h1>¡Bienvenido de vuelta!</h1>
              <p>{patient && patient !== null ? patient.name : ""}</p>
              <p className="instrucciones">
                A continuación realizarás la misma serie de ejercicios que ya
                conoces, te tomará aproximadamente 10 minutos.
              </p>
              <button className="btn btn-primary" onClick={handleNext}>
                Comenzar
              </button>
            </div>
          </div>
        </div>
        <div className="col col-md-6 px-0">
          <img
            src="https://www.udem.edu.mx/sites/default/files/inline-images/Entropia-UDEM.jpg"
            className="half-image"
            alt="portada"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBack;
