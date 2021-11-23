import React from "react";
import Chart from "react-apexcharts";

const NechapiSummary = ({
  anger,
  sensation,
  emotional,
  sociability,
  motivation,
}) => {
  return (
    <div className="mb-3">
      <div className="container-fluid mx-0">
        <div className="row mb-2">
          <div className="col-6 col-md-6 bold">Categoría</div>
          <div className="col-6 col-md-2 bold">Pronóstico</div>
          <div className="col-6 col-md-2 bold">Real</div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Anger</div>
          <div className="col-6 col-md-2">
            {anger.result}
            {"%"}
          </div>
          <div className="col-6 col-md-2">
            {anger.real}
            {"%"}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Sensation Seeking</div>
          <div className="col-6 col-md-2">
            {sensation.result}
            {"%"}
          </div>
          <div className="col-6 col-md-2">
            {sensation.real}
            {"%"}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Emotional Vulnerabilty</div>
          <div className="col-6 col-md-2">
            {emotional.result}
            {"%"}
          </div>
          <div className="col-6 col-md-2">
            {emotional.real}
            {"%"}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Sociability</div>
          <div className="col-6 col-md-2">
            {sociability.result}
            {"%"}
          </div>
          <div className="col-6 col-md-2">
            {sociability.real}
            {"%"}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Motivation</div>
          <div className="col-6 col-md-2">
            {motivation.result}
            {"%"}
          </div>
          <div className="col-6 col-md-2">
            {motivation.real}
            {"%"}
          </div>
        </div>
      </div>
      <Chart
        type="line"
        options={{
          type: "line",
          chart: {
            type: "line",
          },
          colors: [
            "#fcf300",
            "#333333",
            "#368F8B",
            "#ff0000",
            "#0000ff",
            "#368F8B",
          ],
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
            labels: {
              formatter: (value) => {
                return parseInt(val);
              },
            },
          },
        }}
        series={[
          {
            name: "Pronosticado",
            type: "column",
            data: [
              anger.result,
              sensation.result,
              emotional.result,
              sociability.result,
              motivation.result,
            ],
          },
          {
            name: "Real",
            type: "column",
            data: [
              anger.real,
              sensation.real,
              emotional.real,
              sociability.real,
              motivation.real,
            ],
          },
          {
            name: "Promedio",
            type: "line",
            data: [
              anger.average,
              sensation.average,
              emotional.average,
              sociability.average,
              motivation.average,
            ],
          },
          {
            name: "Lim. Superior",
            type: "line",
            data: [
              anger.average + anger.dev,
              sensation.average + sensation.dev,
              emotional.average + emotional.dev,
              sociability.average + sociability.dev,
              motivation.average + motivation.dev,
            ],
          },
          {
            name: "Lim. Inferior",
            type: "line",
            data: [
              anger.average - anger.dev,
              sensation.average - sensation.dev,
              emotional.average - emotional.dev,
              sociability.average - sociability.dev,
              motivation.average - motivation.dev,
            ],
          },
        ]}
      />
    </div>
  );
};

export default NechapiSummary;
