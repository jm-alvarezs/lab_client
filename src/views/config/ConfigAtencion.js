import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/global/Breadcrumbs";
import { PacientesContext } from "../../context/PacientesContext";
import { PruebasContext } from "../../context/PruebasContext";
import { Link } from "@reach/router";
import { ModalContext } from "../../context/ModalContext";

const ConfigAtencion = ({ idPaciente, submit, submitCallback }) => {
  const [config, setConfig] = useState({
    idTestType: 1,
    tiempoExposicion: "500",
    tiempoInterestimular: "500",
    target: "O",
    fontFamily: "Courier",
    fontStyle: "Normal",
    fontSize: "100",
    color: "#000000",
    backgroundColor: "#cccccc",
    numeroEstimulos: "300",
    aparicion: "17",
    keyCode: "32",
    duracion: "10",
  });

  useEffect(() => {
    if (submit) {
      handleSubmit();
    }
  }, [submit]);

  const { spinner, postPrueba } = useContext(PruebasContext);

  const { paciente, getSinglePaciente } = useContext(PacientesContext);

  const { alert } = useContext(ModalContext);

  useEffect(() => {
    setConfig({ ...config, idPatient: idPaciente });
    getSinglePaciente(idPaciente);
  }, []);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (["", " ", undefined].includes(config.target)) {
      return alert("El target no puede estar vacío");
    }
    postPrueba(config, paciente, { handle: "atencion" }, submitCallback);
  };

  const handleChange = (key, e) => {
    let { value } = e.target;
    if (
      [
        "tiempoExposicion",
        "tiempoInterestimular",
        "fontSize",
        "numeroEstimulos",
        "aparicion",
      ].includes(key)
    ) {
      value = Math.abs(value);
    }
    if (key === "fontSize" && parseInt(value) === 0) value = 1;
    if (key === "target") value = String(value)[0];
    if (key === "numeroEstimulos" && value < 1) value = 1;
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
          <h1 className="mb-4 h3">Configuración - Atención Simple</h1>
          <div className="card p-3 mb-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <h2 className="h4 mb-3 border-bottom pb-3">Parámetros</h2>
              <div className="row">
                <div className="col-6">
                  <label>Tiempo de Exposición</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
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
                    type="number"
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
                    <option value="regular">Normal</option>
                    <option value="italic">Cursiva</option>
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
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={aparicion}
                    onChange={(e) => handleChange("aparicion", e)}
                  />
                </div>
                <div className="col-3">
                  <p>%</p>
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
                    <option value={32}>Espacio</option>
                    <option value={13}>Intro</option>
                  </select>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-6">
                  <label>Duración</label>
                </div>
                <div className="col-3">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={
                      ((parseInt(tiempoExposicion) +
                        parseInt(tiempoInterestimular)) *
                        parseInt(numeroEstimulos)) /
                      1000
                    }
                    disabled
                  />
                </div>
                <div className="col-3">
                  <p>segundos (s)</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Link
                    to="../"
                    className="btn btn-link text-danger btn-block mt-3"
                  >
                    Cancelar
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-dark btn-block mt-3"
                    disabled={spinner}
                  >
                    {spinner ? (
                      <div className="spinner-border"></div>
                    ) : (
                      "Terminado"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigAtencion;
