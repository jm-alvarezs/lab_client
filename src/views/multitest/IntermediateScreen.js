import React from "react";

const IntermediateScreen = ({ handleNext }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6 border-right shadow bg-light">
          <div className="row align-items-center vh-100">
            <div className="p-5">
              <h2>Ejercicio completado</h2>
              <p className="instrucciones">
                Haz terminado un ejercicio. Da click a siguiente para empezar el
                siguiente cuando te sientas listo.
              </p>
              <button className="btn btn-dark" onClick={handleNext}>
                Siguiente
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

export default IntermediateScreen;
