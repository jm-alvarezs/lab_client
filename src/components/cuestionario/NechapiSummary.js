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
          <div className="col-6 col-md-6 bold">Resultado</div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Anger</div>
          <div className="col-6 col-md-6">
            {anger}
            {"%"}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Sensation Seeking</div>
          <div className="col-6 col-md-2">
            {sensation}
            {"%"}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Emotional Vulnerabilty</div>
          <div className="col-6 col-md-2">
            {emotional}
            {"%"}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Sociability</div>
          <div className="col-6 col-md-2">
            {sociability}
            {"%"}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-6 col-md-6">Motivation</div>
          <div className="col-6 col-md-2">
            {motivation}
            {"%"}
          </div>
        </div>
      </div>
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
            name: "Pronosticado",
            data: [anger, sensation, emotional, sociability, motivation],
          },
        ]}
      />
    </div>
  );
};

export default NechapiSummary;
