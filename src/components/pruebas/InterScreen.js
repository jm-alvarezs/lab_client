import React from "react";
import Instrucciones from "../global/Instrucciones";

const InterScreen = ({
  start,
  thankyou,
  disabled,
  instrucciones,
  customSrc,
}) => {
  const src = customSrc
    ? customSrc
    : "https://www.udem.edu.mx/sites/default/files/inline-images/Entropia-UDEM.jpg";

  return (
    <div className="row">
      <div className="col col-md-6 border-right shadow bg-light">
        <div className="row align-items-center vh-100">
          {!thankyou ? (
            <div className="p-5">
              <h1>Bienvenido</h1>
              <p>A continuación realizarás un ejercicio.</p>
              <h3>Instrucciones</h3>
              {<Instrucciones contents={instrucciones} />}
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
        <img src={src} className="half-image" />
      </div>
    </div>
  );
};

export default InterScreen;
