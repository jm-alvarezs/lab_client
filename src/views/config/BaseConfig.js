import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/global/Breadcrumbs";
import { PacientesContext } from "../../context/PacientesContext";
import { PruebasContext } from "../../context/PruebasContext";
import Switch from "react-switch";
import { Link } from "@reach/router";
import { TestTypeContext } from "../../context/TestTypeContext";

const BaseConfig = ({
  name,
  idPatient,
  idTestType,
  configSchema,
  defaultConfig,
  submitCallback,
}) => {
  const [config, setConfig] = useState({});

  const { spinner, postPrueba } = useContext(PruebasContext);

  const { paciente, getSinglePaciente } = useContext(PacientesContext);

  const { testType, getSingleTestType } = useContext(TestTypeContext);

  useEffect(() => {
    setConfig({ ...defaultConfig, idPatient });
    getSinglePaciente(idPatient);
    getSingleTestType(idTestType);
  }, []);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (paciente !== null) {
      postPrueba(config, paciente, testType, submitCallback);
    }
  };

  const handleChange = (key, e) => {
    if (typeof e === "object") {
      const { value } = e.target;
      setConfig({ ...config, [key]: value });
    } else {
      setConfig({ ...config, [key]: e });
    }
  };

  const renderForm = () => {
    return Object.keys(configSchema).map((key) => (
      <div className="row" key={key}>
        <div className="col-6">
          <label className="text-capitalze">{configSchema[key].label}</label>
        </div>
        <div className="col-6">
          {configSchema[key].type === "select" ? (
            <select
              value={config[key]}
              className="form-control mb-3"
              onChange={(e) => handleChange(key, e)}
            >
              {configSchema[key].options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ) : configSchema[key].type === "boolean" ? (
            <Switch
              checked={config[key]}
              onChange={(checked) => handleChange(key, checked)}
            />
          ) : (
            <input
              type={configSchema[key].type}
              value={config[key]}
              className="form-control mb-3"
              onChange={(e) => handleChange(key, e)}
            />
          )}
        </div>
      </div>
    ));
  };

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
                href: `/pacientes/${idPatient}`,
              },
            ]}
          />
          <h1 className="mb-4 h3">Configuración - {name}</h1>
          <div className="card p-3 mb-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <h2 className="h4 mb-3 border-bottom pb-3">Parámetros</h2>
              {renderForm()}
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
                    className="btn btn-primary btn-block mt-3"
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

export default BaseConfig;
