import React, { useContext, useState } from "react";
import { PruebasContext } from "../context/PruebasContext";

const ConfigPrueba = ({ idPrueba }) => {
  const [config, setConfig] = useState({
    tiempoExposicion: "",
    tiempoInterestimular: "",
    target: "",
    fontFamily: "",
    fontStyle: "",
    fontSize: "",
    color: "",
    backgroundColor: "",
    numeroEstimulos: "",
    aparicion: "",
    keyCode: "",
    duracion: "",
    nombre: "",
    sujeto: "",
  });

  const { postPrueba } = useContext(PruebasContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const args = Object.keys(config)
      .map((key) =>
        config[key] !== "" && config[key] !== null && config[key]
          ? `${key}=${config[key]}`
          : null
      )
      .filter((obj) => obj !== null)
      .join("&");
    postPrueba(config);
    window.open("/atencion?" + args, "_blank");
  };

  const handleChange = (key, e) => {
    const { value } = e.target;
    setConfig({ ...config, [key]: value });
  };

  const {
    tiempoExposicion,
    tiempoInterestimular,
    target,
    fontFamily,
    fontStyle,
    fontSize,
    color,
    backgroundColor,
    numeroEstimulos,
    aparicion,
    keyCode,
    duracion,
    nombre,
    sujeto,
  } = config;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container px-0 mt-2 narrow">
          <h1>Configuración - Atención Simple</h1>
          <div className="card p-3 mb-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <label>Nombre de la Prueba</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={nombre}
                    onChange={(e) => handleChange("nombre", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Sujeto</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Escribe para buscar..."
                    value={sujeto}
                    onChange={(e) => handleChange("sujeto", e)}
                  />
                </div>
              </div>
              <h2>Parámetros</h2>
              <div className="row">
                <div className="col-6">
                  <label>Tiempo de Exposición</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="milisegundos (ms)"
                    value={tiempoExposicion}
                    onChange={(e) => handleChange("tiempoExposicion", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tiempo Interestimular</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="milisegundos (ms)"
                    value={tiempoInterestimular}
                    onChange={(e) => handleChange("tiempoInterestimular", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Target</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="[A-Z]"
                    value={target}
                    onChange={(e) => handleChange("target", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tipo de Letra</label>
                </div>
                <div className="col-6">
                  <select
                    className="form-control mb-3"
                    value={fontFamily}
                    onChange={(e) => handleChange("fontFamily", e)}
                  >
                    <option>Courier</option>
                    <option>Montserrat</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Estilo de Fuente</label>
                </div>
                <div className="col-6">
                  <select
                    className="form-control mb-3"
                    value={fontStyle}
                    onChange={(e) => handleChange("fontStyle", e)}
                  >
                    <option>Normal</option>
                    <option>Negrita</option>
                    <option>Cursiva</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Color de la Fuente</label>
                </div>
                <div className="col-6">
                  <input
                    type="color"
                    className="form-control mb-3"
                    value={color}
                    onChange={(e) => handleChange("color", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tamaño de la Fuente</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="pixeles (px)"
                    value={fontSize}
                    onChange={(e) => handleChange("fontSize", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Color del fondo</label>
                </div>
                <div className="col-6">
                  <input
                    type="color"
                    className="form-control mb-3"
                    value={backgroundColor}
                    onChange={(e) => handleChange("backgroundColor", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Número de Estímulos</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={numeroEstimulos}
                    onChange={(e) => handleChange("numeroEstimulos", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Aparición del Target</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="%"
                    value={aparicion}
                    onChange={(e) => handleChange("aparicion", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Botón o tecla de respuesta</label>
                </div>
                <div className="col-6">
                  <select
                    className="form-control mb-3"
                    value={keyCode}
                    onChange={(e) => handleChange("keyCode", e)}
                  >
                    <option>Espacio</option>
                    <option>Intro</option>
                    <option>Cualquiera</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Duración</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="segundos (s)"
                    value={duracion}
                    onChange={(e) => handleChange("duracion", e)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Terminado
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPrueba;
