import React, { useState, useEffect } from "react";
import { preguntasCUPOM } from "../../utils";

const PreguntasCUPOM = ({ modifier, valores }) => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    setResultados(new Array(preguntasCUPOM.length).fill("no"));
  }, []);

  useEffect(() => {
    if (modifier) {
      modifier(resultados);
    }
  }, [resultados]);

  const handleChange = (e, index) => {
    const resp = e.target.value;
    const current = [...resultados];
    current[index] = resp;
    setResultados(current);
  };

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
            <div className="col">
              <label>
                <input
                  type="radio"
                  value="si"
                  name={index}
                  className="mr-2"
                  onChange={(e) => handleChange(e, index)}
                />
                Si
              </label>
            </div>
            <div className="col">
              <label>
                <input
                  type="radio"
                  value="no"
                  name={index}
                  className="mr-2"
                  onChange={(e) => handleChange(e, index)}
                />
                No
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreguntasCUPOM;
