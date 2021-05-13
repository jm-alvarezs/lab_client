import React, { useContext, useEffect, useState } from "react";
import { ResultadosContext } from "../context/ResultadosContext";
import {
  categoriasCUPOM,
  categoriasNechapi,
  getPuntuacionCUPOM,
  getPuntuacionNechapi,
} from "../utils";
import Chart from "react-apexcharts";
import ReactToPdf from "react-to-pdf";
import moment from "moment";

const ResultadosCuestionario = ({ type, id }) => {
  const { resultado, getCuestionarioResults } = useContext(ResultadosContext);

  useEffect(() => {
    getCuestionarioResults(type);
  }, []);

  const renderDatos = () => {
    if (resultado && resultado !== null) {
      return (
        <div className="container-fluid my-4">
          <h5 className="bold border-bottom pb-2">Datos</h5>
          <div className="row my-2">
            <div className="col-12 col-md-6">Nombre:</div>
            <div className="col-12 col-md-6">{resultado.nombre}</div>
          </div>
          <div className="row my-2">
            <div className="col-12 col-md-6">Relación:</div>
            <div className="col-12 col-md-6">{resultado.relacion}</div>
          </div>
          <div className="row my-2">
            <div className="col-12 col-md-6">Fecha:</div>
            <div className="col-12 col-md-6">{resultado.fecha_hora}</div>
          </div>
          <div className="row my-2">
            <div className="col-12 col-md-6">Observaciones:</div>
            <div className="col-12 col-md-6">{resultado.observaciones}</div>
          </div>
        </div>
      );
    }
  };

  const renderResults = () => {
    if (resultado && resultado !== null) {
      if (resultado.nombre_cuestionario === "nechapi") {
        return (
          <div className="container-fluid mx-0">
            <div className="row my-2">
              <div className="col-6 col-md-6 bold">Categoría</div>
              <div className="col-6 col-md-2 bold">Antes</div>
              <div className="col-6 col-md-2 bold">Después</div>
              <div className="col-6 col-md-2 bold">ICX</div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Anger</div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi("anger", resultado.respuestas, "antes")}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi("anger", resultado.respuestas, "despues")}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {(
                  getPuntuacionNechapi(
                    "anger",
                    resultado.respuestas,
                    "despues"
                  ) -
                  getPuntuacionNechapi("anger", resultado.respuestas, "antes")
                ).toFixed(2)}
                {"%"}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Sensation Seeking</div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi(
                  "sensation",
                  resultado.respuestas,
                  "antes"
                )}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi(
                  "sensation",
                  resultado.respuestas,
                  "despues"
                )}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {(
                  getPuntuacionNechapi(
                    "sensation",
                    resultado.respuestas,
                    "despues"
                  ) -
                  getPuntuacionNechapi(
                    "sensation",
                    resultado.respuestas,
                    "antes"
                  )
                ).toFixed(2)}
                {"%"}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Emotional Vulnerabilty</div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi(
                  "emotional",
                  resultado.respuestas,
                  "antes"
                )}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi(
                  "emotional",
                  resultado.respuestas,
                  "despues"
                )}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {(
                  getPuntuacionNechapi(
                    "emotional",
                    resultado.respuestas,
                    "despues"
                  ) -
                  getPuntuacionNechapi(
                    "emotional",
                    resultado.respuestas,
                    "antes"
                  )
                ).toFixed(2)}
                {"%"}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Sociability</div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi(
                  "sociability",
                  resultado.respuestas,
                  "antes"
                )}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi(
                  "sociability",
                  resultado.respuestas,
                  "despues"
                )}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {(
                  getPuntuacionNechapi(
                    "sociability",
                    resultado.respuestas,
                    "despues"
                  ) -
                  getPuntuacionNechapi(
                    "sociability",
                    resultado.respuestas,
                    "antes"
                  )
                ).toFixed(2)}
                {"%"}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6 col-md-6">Motivation</div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi(
                  "motivation",
                  resultado.respuestas,
                  "antes"
                )}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {getPuntuacionNechapi(
                  "motivation",
                  resultado.respuestas,
                  "despues"
                )}
                {"%"}
              </div>
              <div className="col-6 col-md-2">
                {(
                  getPuntuacionNechapi(
                    "motivation",
                    resultado.respuestas,
                    "despues"
                  ) -
                  getPuntuacionNechapi(
                    "motivation",
                    resultado.respuestas,
                    "antes"
                  )
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
              {getPuntuacionCUPOM("trabajo", resultado.respuestas)}
              {"%"}
            </div>
          </div>
          <div className="row my-2">
            <div className="col-6 col-md-6">Memoria de Reconocimiento</div>
            <div className="col-6 col-md-6">
              {getPuntuacionCUPOM("reconocimiento", resultado.respuestas)}
              {"%"}
            </div>
          </div>
          <div className="row my-2">
            <div className="col-6 col-md-6">Memoria de Fijación</div>
            <div className="col-6 col-md-6">
              {getPuntuacionCUPOM("fijacion", resultado.respuestas)}
              {"%"}
            </div>
          </div>
          <div className="row my-2">
            <div className="col-6 col-md-6">Memoria de Prospectiva</div>
            <div className="col-6 col-md-6">
              {getPuntuacionCUPOM("prospectiva", resultado.respuestas)}
              {"%"}
            </div>
          </div>
          <div className="row my-2">
            <div className="col-6 col-md-6">Memoria Procedimental</div>
            <div className="col-6 col-md-6">
              {getPuntuacionCUPOM("procedimental", resultado.respuestas)}
              {"%"}
            </div>
          </div>
        </div>
      );
    }
  };

  const getChartSeries = (type, respuestas, tiempo) => {
    if (type === "nechapi") {
      return Object.keys(categoriasNechapi).map((key) =>
        getPuntuacionNechapi(key, respuestas, tiempo)
      );
    }
    return Object.keys(categoriasCUPOM).map((key) =>
      getPuntuacionCUPOM(key, respuestas)
    );
  };

  const renderChart = () => {
    if (resultado && resultado !== null) {
      if (resultado.nombre_cuestionario === "nechapi") {
        return (
          <Chart
            type="bar"
            options={{
              type: "bar",
              chart: {
                type: "bar",
              },
              colors: ["#ff0000", "#0000ff"],
              xaxis: {
                categories: [
                  "Irritabilidad",
                  "Búsqueda de sensaciones",
                  "Vulnerabilidad",
                  "Sociabilidad",
                  "Motivación",
                ],
              },
              yaxis: {
                min: 0,
                max: 100,
              },
            }}
            series={[
              {
                name: "Antes",
                data: getChartSeries(type, resultado.respuestas, "antes"),
              },
              {
                name: "Después",
                data: getChartSeries(type, resultado.respuestas, "despues"),
              },
            ]}
          />
        );
      }
      return (
        <Chart
          type="bar"
          options={{
            type: "bar",
            chart: {
              type: "bar",
            },
            colors: ["#ff0000", "#0000fff"],
            xaxis: {
              categories: [
                "Trabajo",
                "Reconocimiento",
                "Fijación",
                "Prospectiva",
                "Procedimental",
              ],
            },
          }}
          series={[
            {
              name: "Antes",
              data: getChartSeries(type, resultado.respuestas),
            },
          ]}
        />
      );
    }
  };

  return (
    <ReactToPdf
      filename={`resultados_cuestionario_${type}_${id}_${moment().format(
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
                    resultado.nombre_cuestionario
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
        </div>
      )}
    </ReactToPdf>
  );
};

export default ResultadosCuestionario;
