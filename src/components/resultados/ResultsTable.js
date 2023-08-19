import React from "react";
import StickyHeadTable from "../global/StickyHeadTable";
import { Link } from "@reach/router";
import moment from "moment";

const TypeName = (props) => {
  const { id, testType, surveyType } = props;
  if (testType && testType !== null) {
    return (
      <Link to={`/resultados/${testType.handle}/${id}`}>{testType.name}</Link>
    );
  }
  if (surveyType && surveyType !== null) {
    return (
      <Link to={`/resultados/${surveyType.handle}/${id}`}>
        {surveyType.name}
      </Link>
    );
  }
  return <div></div>;
};

const PatientName = ({ patient }) => {
  if (patient && patient !== null) {
    return (
      <div>
        #{patient.id} - {patient.email} - {patient.name}
      </div>
    );
  }
  return <div></div>;
};

const columns = [
  {
    id: "id",
    label: "#ID",
  },
  {
    id: "name",
    label: "Ejercicio",
    component: (props) => <TypeName {...props} />,
  },
  {
    id: "patient",
    label: "Paciente",
    component: (props) => <PatientName {...props} />,
  },
  {
    id: "createdAt",
    label: "Fecha",
    component: ({ createdAt }) => moment(createdAt).format("DD MMM YYYY HH:mm"),
  },
  {
    id: "completedAt",
    label: "Completado",
    component: ({ completedAt }) => {
      if (completedAt === null) return "";
      return moment(completedAt).format("DD MMM YYYY HH:mm");
    },
  },
];

const ResultsTable = ({ name, results }) => {
  const renderResults = () => {
    if (Array.isArray(results)) {
      if (results.length === 0) {
        return <p>No hay {name} registrados.</p>;
      }
      return <StickyHeadTable columns={columns} rows={results} />;
    }
  };
  return <div className="row">{renderResults()}</div>;
};

export default ResultsTable;
