import React, { useContext, useEffect, useState } from "react";
import { PruebasContext } from "../context/PruebasContext";

const ConfigHemiAtencion = ({ idPaciente }) => {
  const [config, setConfig] = useState({
    idTestType: 2,
    tiempoExposicion: "500",
    tiempoInterestimular: "500",
    target: "O",
    fontFamily: "Courier",
    fontStyle: "Normal",
    fontSize: "24",
    color: "#fff",
    backgroundColor: "#000",
    keyCode: "13",
    duracion: "10",
    radioFijacion: "20",
    colorFijacion: "#fff",
    estimulosQ1: "50",
    estimulosQ2: "50",
    estimulosQ3: "50",
    estimulosQ4: "50",
    aparicionQ1: "17",
    aparicionQ2: "17",
    aparicionQ3: "17",
    aparicionQ4: "17",
    idPatient: "",
  });

  const { spinner, postPrueba } = useContext(PruebasContext);

  useEffect(() => {
    setConfig({ ...config, idPatient: parseInt(idPaciente) });
  }, []);

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
    postPrueba(config, "hemi");
  };

  const handleChange = (key, e) => {
    const { value } = e.target;
    setConfig({ ...config, [key]: value });
  };

  const getNumeroDeEstimulos = () => {
    const { estimulosQ1, estimulosQ2, estimulosQ3, estimulosQ4 } = config;
    return (
      parseInt(estimulosQ1) +
      parseInt(estimulosQ2) +
      parseInt(estimulosQ3) +
      parseInt(estimulosQ4)
    );
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
    keyCode,
    duracion,
    radioFijacion,
    colorFijacion,
    estimulosQ1,
    estimulosQ2,
    estimulosQ3,
    estimulosQ4,
    aparicionQ1,
    aparicionQ2,
    aparicionQ3,
    aparicionQ4,
  } = config;

  return (
    <div className="container-fluid">
      <div className="row mx-0">
        <div className="container mt-2">
          <h1 className="mb-4 h3">Configuración - Hemi Atención</h1>
          <div className="card p-3 mb-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <h2 className="h4 mb-3 border-bottom pb-3">Parámetros</h2>
              <div className="row">
                <div className="col-6">
                  <label>Tiempo de Exposición</label>
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={tiempoExposicion}
                    onChange={(e) => handleChange("tiempoExposicion", e)}
                  />
                </div>
                <div className="col-3">
                  <p>milisegundos (s)</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tiempo Interestimular</label>
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={tiempoInterestimular}
                    onChange={(e) => handleChange("tiempoInterestimular", e)}
                  />
                </div>
                <div className="col-3">
                  <p>milisegundos (s)</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Target</label>
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={target}
                    onChange={(e) => handleChange("target", e)}
                  />
                </div>
                <div className="col-3">
                  <p>[A-Z]</p>
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
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={fontSize}
                    onChange={(e) => handleChange("fontSize", e)}
                  />
                </div>
                <div className="col-3">
                  <p>pixeles (px)</p>
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
                  <label>Radio de Punto de Fijación</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={radioFijacion}
                    onChange={(e) => handleChange("radioFijacion", e)}
                  />
                </div>
                <div className="col-3">
                  <p>pixeles</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Color de Punto de Fijación</label>
                </div>
                <div className="col-6">
                  <input
                    type="color"
                    className="form-control mb-3"
                    value={colorFijacion}
                    onChange={(e) => handleChange("colorFijacion", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Número de Estímulos de Cuadrante 1</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={estimulosQ1}
                    onChange={(e) => handleChange("estimulosQ1", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Número de Estímulos de Cuadrante 2</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={estimulosQ2}
                    onChange={(e) => handleChange("estimulosQ2", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Número de Estímulos de Cuadrante 3</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={estimulosQ3}
                    onChange={(e) => handleChange("estimulosQ3", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Número de Estímulos de Cuadrante 4</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={estimulosQ4}
                    onChange={(e) => handleChange("estimulosQ4", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Aparición del Target Cuadrante 1</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={aparicionQ1}
                    onChange={(e) => handleChange("aparicionQ1", e)}
                  />
                </div>
                <div className="col-3">
                  <p>%</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Aparición del Target Cuadrante 2</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={aparicionQ2}
                    onChange={(e) => handleChange("aparicionQ2", e)}
                  />
                </div>
                <div className="col-3">
                  <p>%</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Aparición del Target Cuadrante 3</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={aparicionQ3}
                    onChange={(e) => handleChange("aparicionQ3", e)}
                  />
                </div>
                <div className="col-3">
                  <p>%</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Aparición del Target Cuadrante 4</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={aparicionQ4}
                    onChange={(e) => handleChange("aparicionQ4", e)}
                  />
                </div>
                <div className="col-3">
                  <p>%</p>
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
                    value={getNumeroDeEstimulos()}
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Duración</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={duracion}
                    onChange={(e) => handleChange("duracion", e)}
                  />
                </div>
                <div className="col-3">
                  <p>segundos (s)</p>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-dark btn-block mt-3"
                disabled={spinner}
              >
                {spinner ? <div className="spinner-border"></div> : "Terminado"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigHemiAtencion;
