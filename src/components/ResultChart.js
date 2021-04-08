import React from "react";
import Chart from "react-apexcharts";

const ResultChart = () => {
  var options = {
    colors: ["#fff500"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "24px",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
      color: "#fff500",
    },
    labels: ["Aciertos"],
  };
  return (
    <Chart type="radialBar" options={options} series={[67]} height={250} />
  );
};

export default ResultChart;
