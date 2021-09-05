import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../components/global/Breadcrumbs";
import { ModalContext } from "../context/ModalContext";
import { PacientesContext } from "../context/PacientesContext";
import { PruebasContext } from "../context/PruebasContext";

const ConfigFlanker = ({ idPaciente }) => {
  const [config, setConfig] = useState({
    idTestType: 5,
    estimulosEntrenamiento: 0,
    estimulosPrueba: 48,
    fontSize: 100,
    color: "#000",
    backgroundColor: "#fff",
    leftKey: "A",
    rightKey: "L",
  });

  const { spinner, postPrueba } = useContext(PruebasContext);

  const { paciente, getSinglePaciente } = useContext(PacientesContext);

  const { alert } = useContext(ModalContext);

  useEffect(() => {
    setConfig({ ...config, idPatient: idPaciente });
    getSinglePaciente(idPaciente);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (config.leftKey === config.rightKey) {
      return alert("Las teclas no pueden ser iguales");
    }
    if (config.fontSize === "") {
      return alert("El tamaño de letra no puede estar vacío");
    }
    postPrueba(config, "flanker", paciente);
  };

  const handleChange = (key, e) => {
    let { value } = e.target;
    if (key === "fontSize" && value > 200) {
      value = 200;
    }
    if (String(key).includes("Key")) {
      value = value[0];
    }
    setConfig({ ...config, [key]: value });
  };

  const {
    bgColor,
    leftKey,
    rightKey,
    fontSize,
    fontColor,
    estimulosPrueba,
    estimulosEntrenamiento,
  } = config;

  return (
    <div className="container-fluid">
      <div className="row mx-0">
        <div className="container mt-2">
          <Breadcrumbs
            elements={[
              { name: "Pacientes", href: "/pacientes" },
              {
                name:
                  paciente && paciente !== null ? paciente.name : "Paciente",
                href: `/pacientes/${idPaciente}`,
              },
            ]}
          />
          <h1 className="mb-4 h3">Configuración - Flanker Task</h1>
          <div className="card p-3 mb-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <h2 className="h4 mb-3 border-bottom pb-3">Parámetros</h2>
              <div className="row mb-2">
                <div className="col-6">
                  <label>Estímulos de Entrenamiento</label>
                </div>
                <div className="col-6">
                  <select
                    className="form-control mb-3"
                    value={estimulosEntrenamiento}
                    onChange={(e) => handleChange("estimulosEntrenamiento", e)}
                  >
                    <option value="0">0</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label>Estímulos de Prueba</label>
                </div>
                <div className="col-6">
                  <select
                    className="form-control mb-3"
                    value={estimulosPrueba}
                    onChange={(e) => handleChange("estimulosPrueba", e)}
                  >
                    <option value="24">24</option>
                    <option value="48">48</option>
                    <option value="72">72</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tamaño de la Fuente</label>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control mb-3"
                        value={fontSize}
                        onChange={(e) => handleChange("fontSize", e)}
                      />
                    </div>
                    <div className="col-6">px</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Color del Fondo</label>
                </div>
                <div className="col-6">
                  <input
                    type="color"
                    className="form-control mb-3"
                    value={bgColor}
                    onChange={(e) => handleChange("bgColor", e)}
                  />
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
                    value={fontColor}
                    onChange={(e) => handleChange("fontColor", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tecla Izquierda</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={leftKey}
                    onChange={(e) => handleChange("leftKey", e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tecla Derecha</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={rightKey}
                    onChange={(e) => handleChange("rightKey", e)}
                  />
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

export default ConfigFlanker;