import React from "react";
import { preguntasCUPOM } from "../../utils";

const RespuestasCUPOM = ({ respuestas }) => {
  return (
    <div className="container px-0">
      {preguntasCUPOM.map((pregunta, index) => (
        <div key={index} className="mt-2 mb-4">
          <p className="mb-0">
            {index + 1}
            {"- "}
            {pregunta}
          </p>
          <div className="row">
            <div className="container-fluid">
              {respuestas[index] === "si" ? (
                <i className="fa fa-check text-success"></i>
              ) : (
                <i className="fa fa-times"></i>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RespuestasCUPOM;
