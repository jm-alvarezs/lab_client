import React, { useState, useEffect } from "react";
import { preguntasNechapi } from "../../utils";

const PreguntasNechapi = ({ postResultados }) => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    setResultados(
      new Array(preguntasNechapi.length).fill(1).map((one, index) => ({
        index: index + 1,
        before: "",
        after: "",
      }))
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postResultados(resultados);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const type = name.split("-")[0];
    const question = parseInt(name.split("-")[1]);
    const current = [...resultados];
    current[question][type] = value;
    setResultados(current);
  };

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
      </div>
      <form onSubmit={handleSubmit}>
        {preguntasNechapi.map((pregunta, index) => (
          <div
            key={index}
            className="row mt-2 mb-4 border-top border-bottom py-2 mx-0"
          >
            <div className="col col-md-6">
              <p>{pregunta}</p>
            </div>
            <div className="col col-md-3 text-center">
              {new Array(5).fill(1).map((one, idx) => (
                <div key={idx} className="d-inline-block mx-2">
                  <label className="d-block">{idx + 1}</label>
                  <input
                    type="radio"
                    name={`before-${index}`}
                    value={idx + 1}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <div className="col col-md-3 text-center">
              {new Array(5).fill(1).map((one, idx) => (
                <div key={idx} className="d-inline-block mx-2">
                  <label className="d-block">{idx + 1}</label>
                  <input type="radio" name={`after-${index}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="container px-0 text-right">
          <button type="submit" className="btn btn-dark">
            Completar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreguntasNechapi;
