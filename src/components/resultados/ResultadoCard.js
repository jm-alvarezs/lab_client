import moment from "moment";
import React from "react";
import { Link } from "@reach/router";

const ResultadoCard = ({ resultado }) => {
  const type = String(
    resultado.testType && resultado.testType !== null
      ? resultado.testType.name
      : resultado.surveyType !== null
      ? resultado.surveyType.name
      : ""
  ).toLowerCase();
  return (
    <div key={resultado.id} className="card my-2 p-3 shadow-sm">
      <div className="row">
        <div className="col col-md-6">
          <h4 className="h5">
            {resultado.testType ? "Prueba" : "Cuestionario"} #{resultado.id} -{" "}
            {type}
          </h4>
          <p className="bold mb-0">
            Paciente #{resultado.patient.id} - {resultado.patient.name} -{" "}
            {resultado.patient.email}
          </p>
          <p className="mb-0">
            {moment(resultado.createdAt).format("DD MMM YYYY HH:mm")}
          </p>
        </div>
        <div className="col col-md-6 text-right">
          <Link
            to={`./${
              resultado.surveyType && resultado.surveyType !== null
                ? `cuestionario/${resultado.id}`
                : resultado.testType && resultado.testType !== null
                ? `${resultado.testType.handle}/${resultado.id}`
                : ""
            }`}
            className="btn btn-outline-secondary"
          >
            <i className="fa fa-eye"></i> Consultar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultadoCard;
