import React, { useContext, useEffect, useState } from "react";
import { PruebasContext } from "../context/PruebasContext";

const ConfigCondicional = ({ idPaciente }) => {
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
    clave: "X",
    claveTarget: "37",
    noClaveTarget: "19",
    claveNoTarget: "19",
    noClaveNoTarget: "75",
    paresTotales: "150",
    keyCode: "13",
    duracion: "10",
    nombre: "",
    idPatient: "",
  });

  const { spinner, postPrueba } = useContext(PruebasContext);

  useEffect(() => {
    setConfig({ ...config, idPatient: idPaciente });
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
    postPrueba(config, "condicional");
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
    paresTotales,
    clave,
    claveTarget,
    claveNoTarget,
    noClaveTarget,
    noClaveNoTarget,
    keyCode,
    duracion,
    nombre,
  } = config;

  return (
    <div className="container-fluid">
      <div className="row mx-0">
        <div className="container mt-2">
          <h1 className="mb-4 h3">Configuración - Atención Condicional</h1>
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
                  <label>Clave</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={clave}
                    onChange={(e) => handleChange("clave", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Pares Clave - Target</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={claveTarget}
                    onChange={(e) => handleChange("claveTarget", e)}
                  />
                </div>
                <div className="col-3">
                  <p>número</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Pares No Clave - Target</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={noClaveTarget}
                    onChange={(e) => handleChange("noClaveTarget", e)}
                  />
                </div>
                <div className="col-3">
                  <p>número</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Pares Clave - No Target</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={claveNoTarget}
                    onChange={(e) => handleChange("claveNoTarget", e)}
                  />
                </div>
                <div className="col-3">
                  <p>número</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Pares No Clave - No Target</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={noClaveNoTarget}
                    onChange={(e) => handleChange("noClavenoTarget", e)}
                  />
                </div>
                <div className="col-3">
                  <p>número</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Pares Totales</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={paresTotales}
                    onChange={(e) => handleChange("paresTotales", e)}
                  />
                </div>
                <div className="col-3">
                  <p>número</p>
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

export default ConfigCondicional;
