import React, { useContext, useEffect, useState } from "react";
import Buscador from "../components/resultados/Buscador";
import { SurveyContext } from "../context/SurveyContext";
import { ResultadosContext } from "../context/ResultadosContext";
import StickyHeadTable from "../components/global/StickyHeadTable";
import moment from "moment";

const TypeName = ({ testType, surveyType }) => {
  if (testType && testType !== null) {
    return <div>{testType.name}</div>;
  }
  if (surveyType && surveyType !== null) {
    return <div>{surveyType.name}</div>;
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
    component: TypeName,
  },
  {
    id: "patient",
    label: "Paciente",
    component: PatientName,
  },
  {
    id: "createdAt",
    label: "Fecha",
    component: ({ createdAt }) => moment(createdAt).format("DD MMM YYYY HH:mm"),
  },
];

const Results = () => {
  const [tab, setTab] = useState("pruebas");
  const [showFilters, setShowFilters] = useState(false);
  const { resultados, getResultados, clearSingleResultado } =
    useContext(ResultadosContext);

  const { surveys, getSurveys } = useContext(SurveyContext);

  useEffect(() => {
    clearSingleResultado();
  }, []);

  useEffect(() => {
    getSurveys();
    getResultados();
  }, [tab]);

  const renderResultados = () => {
    if (tab === "pruebas") {
      if (Array.isArray(resultados)) {
        if (resultados.length === 0) {
          return <p>No hay resultados registrados.</p>;
        }
        return <StickyHeadTable columns={columns} rows={resultados} />;
      }
    } else {
      if (Array.isArray(surveys)) {
        if (surveys.length === 0) {
          return <p>No hay cuestionarios registrados.</p>;
        }
        return <StickyHeadTable columns={columns} rows={surveys} />;
      }
    }
    return <div className="spinner-border"></div>;
  };

  const renderFiltros = () => {
    if (showFilters) {
      return (
        <div className="row my-4">
          <Buscador survey={tab === "cuestionarios"} />
        </div>
      );
    }
  };

  return (
    <div className="container pt-3">
      <div className="row align-items-center border-bottom pb-3 mb-3">
        <div className="col-md-6">
          <h1 className="mb-0">Resultados</h1>
        </div>
        <div className="col-md-6 text-end">
          <button
            className="btn btn-primary shadow-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fa fa-filter"></i> Filtros
          </button>
        </div>
      </div>
      <div className="row align-items-center br p-2 mb-2 bg-white border">
        <div
          className={
            (tab === "pruebas" ? "selected " : "") + "col-6 br text-center tab"
          }
          onClick={() => setTab("pruebas")}
        >
          Pruebas
        </div>
        <div
          className={
            (tab === "cuestionarios" ? "selected " : "") +
            "col-6 br text-center tab"
          }
          onClick={() => setTab("cuestionarios")}
        >
          Cuestionarios
        </div>
      </div>
      {renderFiltros()}
      <div className="row">{renderResultados()}</div>
    </div>
  );
};

export default Results;
