import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/global/Breadcrumbs";
import { PacientesContext } from "../../context/PacientesContext";
import { PruebasContext } from "../../context/PruebasContext";
import Switch from "react-switch";
import { Link } from "@reach/router";

const ConfigHanoi = ({ idPaciente, submit, submitCallback }) => {
  const [config, setConfig] = useState({
    idTestType: 4,
    administracion: "A",
    discos: "3",
    sonidoError: false,
    mensajeError: false,
  });

  const { spinner, postPrueba } = useContext(PruebasContext);

  const { paciente, getSinglePaciente } = useContext(PacientesContext);

  useEffect(() => {
    setConfig({ ...config, idPatient: idPaciente });
    getSinglePaciente(idPaciente);
  }, []);

  useEffect(() => {
    if (submit) {
      handleSubmit();
    }
  }, [submit]);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    postPrueba(config, "hanoi", paciente, submitCallback);
  };

  const handleChange = (key, e) => {
    const { value } = e.target;
    setConfig({ ...config, [key]: value });
  };

  const { administracion, discos, sonidoError, mensajeError } = config;

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
          <h1 className="mb-4 h3">Configuración - Torre de Hanoi</h1>
          <div className="card p-3 mb-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <h2 className="h4 mb-3 border-bottom pb-3">Parámetros</h2>
              <div className="row mb-2">
                <div className="col-6">
                  <label>Tipo de Administración</label>
                </div>
                <div className="col-6">
                  <select
                    className="form-control"
                    value={administracion}
                    onChange={(e) => handleChange("administracion", e)}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label>Número de discos</label>
                </div>
                <div className="col-6">
                  <select
                    className="form-control"
                    value={discos}
                    onChange={(e) => handleChange("discos", e)}
                  >
                    <option value="3">3</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label>Sonido de Error</label>
                </div>
                <div className="col-6">
                  <Switch
                    checked={sonidoError}
                    onChange={(checked) =>
                      handleChange("sonidoError", {
                        target: { value: checked },
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label>Mensaje Error</label>
                </div>
                <div className="col-6">
                  <Switch
                    checked={mensajeError}
                    onChange={(checked) =>
                      handleChange("mensajeError", {
                        target: { value: checked },
                      })
                    }
                  />
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

export default ConfigHanoi;
