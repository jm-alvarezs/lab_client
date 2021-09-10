import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { PacientesContext } from "../context/PacientesContext";
import { PruebasContext } from "../context/PruebasContext";
import { BASE_URL, hideModal, processMultiTestUrl } from "../utils";
import ConfigAtencion from "./ConfigAtencion";
import ConfigCondicional from "./ConfigCondicional";
import ConfigFlanker from "./ConfigFlanker";
import ConfigHanoi from "./ConfigHanoi";
import ConfigHemiAtencion from "./ConfigHemiAtencion";

const MultiConfig = ({ idPaciente }) => {
  const [configs, setConfigs] = useState([]);
  const [submitAll, setSubmitAll] = useState(false);

  const { paciente, getSinglePaciente } = useContext(PacientesContext);

  const { tests, spinner, addTest } = useContext(PruebasContext);

  const { modalComponent } = useContext(ModalContext);

  useEffect(() => {
    let { tests } = processMultiTestUrl(window.location.href);
    getSinglePaciente(idPaciente);
    setConfigs(tests);
  }, []);

  useEffect(() => {
    if (submitAll) {
      hideModal();
    }
  }, [submitAll]);

  useEffect(() => {
    if (tests.length === configs.length) {
      window.open(
        `/multi?tests=${tests.map((test) => test.idTest)}&tokens=${tests.map(
          (test) => test.token
        )}`,
        "_blank"
      );
    }
  }, [tests]);

  const confirmSubmit = () => {
    modalComponent(
      "Confirmar",
      <div>
        <p>
          ¿Estás seguro que deseas generar el multi ejercicio para el paciente{" "}
          <b>
            #{paciente.id} - {paciente.name}
          </b>
          ?
        </p>
        <button
          className="btn btn-dark"
          onClick={() => {
            setSubmitAll(true);
          }}
        >
          Crear Multi Ejercicio
        </button>
      </div>
    );
  };

  const renderTestConfig = (idTestType) => {
    switch (idTestType) {
      case 1:
        return (
          <ConfigAtencion
            idPaciente={idPaciente}
            submit={submitAll}
            submitCallback={addTest}
            hideButton
          />
        );
      case 2:
        return (
          <ConfigCondicional
            idPaciente={idPaciente}
            submit={submitAll}
            submitCallback={addTest}
            hideButton
          />
        );
      case 3:
        return (
          <ConfigHemiAtencion
            idPaciente={idPaciente}
            submit={submitAll}
            submitCallback={addTest}
            hideButton
          />
        );
      case 4:
        return (
          <ConfigHanoi
            idPaciente={idPaciente}
            submit={submitAll}
            submitCallback={addTest}
            hideButton
          />
        );
      default:
        return (
          <ConfigFlanker
            idPaciente={idPaciente}
            submit={submitAll}
            submitCallback={addTest}
            hideButton
          />
        );
    }
  };

  return (
    <div className="container px-0">
      {configs.map((config) => renderTestConfig(config))}
      <div className="container px-5 pb-5">
        <button
          disabled={spinner}
          className="btn btn-dark"
          onClick={confirmSubmit}
        >
          {spinner ? (
            <div className="spinner-border"></div>
          ) : (
            "Crear Multi Ejercicio"
          )}
        </button>
      </div>
    </div>
  );
};

export default MultiConfig;
