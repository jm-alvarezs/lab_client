import React from "react";
import Chart from "react-apexcharts";
import { getChartSeries } from "../../utils";

const ChartNechapi = ({ questions }) => {
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
        dataLabels: {
          formatter: (val) => parseInt(val),
        },
      }}
      series={[
        {
          name: "Antes",
          data: getChartSeries("nechapi", questions, "before"),
        },
        {
          name: "Después",
          data: getChartSeries("nechapi", questions, "after"),
        },
      ]}
    />
  );
};

export default ChartNechapi;
