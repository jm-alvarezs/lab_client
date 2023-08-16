import React from "react";

const MultiTestThankYou = ({ handleReset }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6 border-right shadow bg-light">
          <div className="row align-items-center vh-100">
            <div className="p-5">
              <h1>Gracias</h1>
              <p className="instrucciones">
                Apreciamos su participación. Puede cerrar esta ventana.
              </p>
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

export default MultiTestThankYou;
