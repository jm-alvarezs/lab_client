import React from "react";
import BaseConfig from "../../config/BaseConfig";

const configSchema = {
  tiempoInterestimular: {
    type: "number",
    label: "Tiempo Interestimular",
  },
  fontFamily: {
    type: "select",
    options: ["Courier", "Normal", "Montserrat"],
    label: "Tipo de Fuente",
  },
  fontStyle: {
    type: "select",
    options: ["Bold", "Normal"],
    label: "Estilo de la Fuente",
  },
  fontSize: {
    type: "number",
    label: "Tamaño de la Fuente",
    suffix: "px",
  },
  backgroundColor: {
    type: "color",
    label: "Color del fondo",
  },
  numeroEstimulos: {
    type: "number",
    label: "Número de Estimulos",
  },
  coherencia: {
    type: "number",
    label: "Coherencia",
    suffix: "%",
  },
};

const defaultConfig = {
  idTestType: 6,
  tiempoInterestimular: "1000",
  fontFamily: "Courier",
  fontStyle: "Normal",
  fontSize: "100",
  backgroundColor: "#000",
  numeroEstimulos: "48",
  coherencia: "50",
};

const ConfigStroop = ({ idPaciente }) => {
  return (
    <BaseConfig
      name="Prueba de Stroop"
      idPatient={idPaciente}
      idTestType={defaultConfig.idTestType}
      defaultConfig={defaultConfig}
      configSchema={configSchema}
    />
  );
};

export default ConfigStroop;
