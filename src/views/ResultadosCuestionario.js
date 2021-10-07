import React, { useContext, useEffect, useState } from "react";
import { ResultadosContext } from "../context/ResultadosContext";
import { getPuntuacionCUPOM, getPuntuacionNechapi } from "../utils";
import ReactToPdf from "react-to-pdf";
import moment from "moment";
import RespuestasCUPOM from "../components/cuestionario/RespuestasCUPOM";
import RespuestasNechapi from "../components/cuestionario/RespuestasNechapi";
import ChartNechapi from "../components/cuestionario/ChartNechapi";
import ChartCUPOM from "../components/cuestionario/ChartCUPOM";

const ResultadosCuestionario = ({ id }) => {
  const { resultado, getCuestionarioResults } = useContext(ResultadosContext);

  const [showPreguntas, setShowPreguntas] = useState(true);

  useEffect(() => {
    getCuestionarioResults(id);
  }, []);

  const renderDatos = () => {
    if (resultado && resultado !== null) {
      if (resultado.survey) {
        return (
          <div className="container-fluid my-4">
            <h5 className="bold border-bottom pb-2">Datos</h5>
            <div className="row my-2">
              <div className="col-12 col-md-6">Nombre:</div>
              <div className="col-12 col-md-6">
                {resultado.survey.patient.name}{" "}
                {resultado.survey.patient.lastName}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-12 col-md-6">Relación:</div>
              <div className="col-12 col-md-6">
                {resultado.survey.patient.relationship}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-12 col-md-6">Fecha:</div>
              <div className="col-12 col-md-6">
                {moment(resultado.survey.createdAt)
                  .utc()
                  .format("DD MMM YYYY HH:mm")}
              </div>
            </div>
            {resultado.results && (
              <div className="row my-2">
                <div className="col-12 col-md-6">Observaciones:</div>
                <div className="col-12 col-md-6">
                  {resultado.results ? resultado.results.observaciones : ""}
                </div>
              </div>
            )}
          </div>
        );
      }
    }
  };

  const renderResults = () => {
    if (resultado && resultado !== null) {
      if (resultado.results) {
        if (resultado.survey.type === 1) {
          return (
            <div className="container-fluid mx-0">
              <div className="row my-2">
                <div className="col-6 col-md-6 bold">Categoría</div>
                <div className="col-6 col-md-6 bold">Antes</div>
              </div>
              <div className="row my-2">
                <div className="col-6 col-md-6">Anger</div>
                <div className="col-6 col-md-6">
                  {getPuntuacionNechapi(
                    "anger",
                    resultado.results.questions,
                    "before"
                  ).toFixed(2)}
                  {"%"}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-6 col-md-6">Sensation Seeking</div>
                <div className="col-6 col-md-2">
                  {getPuntuacionNechapi(
                    "sensation",
                    resultado.results.questions,
                    "before"
                  ).toFixed(2)}
                  {"%"}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-6 col-md-6">Emotional Vulnerabilty</div>
                <div className="col-6 col-md-2">
                  {getPuntuacionNechapi(
                    "emotional",
                    resultado.results.questions,
                    "before"
                  ).toFixed(2)}
                  {"%"}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-6 col-md-6">Sociability</div>
                <div className="col-6 col-md-2">
                  {getPuntuacionNechapi(
                    "sociability",
                    resultado.results.questions,
                    "before"
                  ).toFixed(2)}
                  {"%"}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-6 col-md-6">Motivation</div>
                <div className="col-6 col-md-2">
                  {getPuntuacionNechapi(
                    "motivation",
                    resultado.results.questions,
                    "before"
                  ).toFixed(2)}
                  {"%"}
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="container-fluid mx-0">
            <div className="row my-2">
              <div className="col-6 col-md-6 bold">Categoría</div>
              <div className="col-6 col-md-3 bold">Puntuación</div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Memoria del Trabajo</div>
              <div className="col-6 col-md-6">
                {getPuntuacionCUPOM("trabajo", resultado.results.questions)}
                {"%"}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Memoria de Reconocimiento</div>
              <div className="col-6 col-md-6">
                {getPuntuacionCUPOM(
                  "reconocimiento",
                  resultado.results.questions
                )}
                {"%"}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Memoria de Fijación</div>
              <div className="col-6 col-md-6">
                {getPuntuacionCUPOM("fijacion", resultado.results.questions)}
                {"%"}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Memoria de Prospectiva</div>
              <div className="col-6 col-md-6">
                {getPuntuacionCUPOM("prospectiva", resultado.results.questions)}
                {"%"}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Memoria Procedimental</div>
              <div className="col-6 col-md-6">
                {getPuntuacionCUPOM(
                  "procedimental",
                  resultado.results.questions
                )}
                {"%"}
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const renderChart = () => {
    if (resultado && resultado !== null) {
      if (resultado.survey && resultado.results) {
        if (resultado.survey.type === 1) {
          return <ChartNechapi questions={resultado.results.questions} />;
        }
        return <ChartCUPOM questions={resultado.results.questions} />;
      }
    }
  };

  const renderRespuestas = () => {
    if (resultado && resultado !== null && showPreguntas) {
      if (resultado.survey && resultado.results) {
        if (resultado.survey.type === 1) {
          return <RespuestasNechapi respuestas={resultado.results.questions} />;
        }
        return <RespuestasCUPOM respuestas={resultado.results.questions} />;
      }
    }
  };

  return (
    <ReactToPdf
      filename={`resultados_cuestionario_${id}_${moment().format(
        "YYYY-MM-DD-HH:mm:ss"
      )}.pdf`}
      scale={0.65}
    >
      {({ toPdf, targetRef }) => (
        <div className="container pb-3" ref={targetRef}>
          <div className="card shadow-sm p-3 my-2">
            <div className="row border-bottom pb-3 mb-3 align-items-center">
              <div className="col col-md-10">
                <h1 className="h3">
                  <b>Resultados:</b>{" "}
                  {resultado && resultado !== null ? (
                    resultado.survey ? (
                      resultado.survey.surveyType.name
                    ) : (
                      ""
                    )
                  ) : (
                    <div className="spinner-border"></div>
                  )}
                </h1>
              </div>
              <div className="col col-md-2 text-right">
                <button className="btn btn-outline-dark" onClick={toPdf}>
                  <i className="fa fa-print"></i>
                </button>
              </div>
            </div>
            {renderDatos()}
            {renderResults()}
            <div className="container-fluid px-0 mt-4">{renderChart()}</div>
          </div>
          <div className="card shadow-sm p-3 mb-2 mt-4">
            <div className="row border-bottom pb-3 my-2 ">
              <div className="col-6">
                <h4 className="bold">Preguntas</h4>
              </div>
              <div className="col-6 text-right">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPreguntas(!showPreguntas)}
                >
                  <i
                    className={`fa fa-eye${showPreguntas ? "-slash" : ""}`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="container-fluid px-0">{renderRespuestas()}</div>
          </div>
        </div>
      )}
    </ReactToPdf>
  );
};

export default ResultadosCuestionario;
