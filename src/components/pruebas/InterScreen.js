import React from "react";
import hanoi from "../../assets/images/hanoi.png";

const InterScreen = ({ start, thankyou, disabled, instrucciones, isHanoi }) => {
  return (
    <div className="row">
      <div className="col col-md-6 border-right shadow bg-light">
        <div className="row align-items-center vh-100">
          {!thankyou ? (
            <div className="p-5">
              <h1>Bienvenido</h1>
              <p>A continuación realizarás un ejercicio.</p>
              <h3>Instrucciones</h3>
              {instrucciones}
              <button
                className="btn btn-dark"
                onClick={start}
                disabled={disabled}
              >
                Comenzar
              </button>
            </div>
          ) : (
            <div className="p-5">
              <h1>¡Gracias!</h1>
              <p>Haz completado el ejercicio.</p>
            </div>
          )}
        </div>
      </div>
      <div className="col col-md-6 px-0">
        {isHanoi ? (
          <div className="row mx-auto align-items-center h-100">
            <div className="container-fluid">
              <img src={hanoi} className="mw-100 w-100 m-auto" />
            </div>
          </div>
        ) : (
          <img
            src="https://www.udem.edu.mx/sites/default/files/inline-images/Entropia-UDEM.jpg"
            className="half-image"
          />
        )}
      </div>
    </div>
  );
};

export default InterScreen;
