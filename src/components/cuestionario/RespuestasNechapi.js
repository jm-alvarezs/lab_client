import React from "react";
import { preguntasNechapi } from "../../utils";

const RespuestasNechapi = ({ respuestas }) => {
  return (
    <div className="container px-0">
      <div className="row mx-0">
        <div className="col col-md-6">
          <p className="mb-0 bold">Pregunta</p>
        </div>
        <div className="col col-md-3 text-center">
          <p className="mb-0 bold">Antes</p>
        </div>
        <div className="col col-md-3 text-center">
          <p className="mb-0 bold">Despues</p>
        </div>
      </div>{" "}
      {preguntasNechapi.map((pregunta, index) => (
        <div
          key={index}
          className="row mt-2 mb-4 border-top border-bottom py-2 mx-0"
        >
          <div className="col col-md-6">
            <p>{pregunta}</p>
          </div>
          <div className="col col-md-3 text-center">
            {respuestas[index].before}
          </div>
          <div className="col col-md-3 text-center">
            {respuestas[index].after}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RespuestasNechapi;
