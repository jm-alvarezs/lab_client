import React from "react";
import Chart from "react-apexcharts";
import { getTargetResult } from "../../utils";

const ResultChart = ({ items, target, type, prevTarget }) => {
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

  let correctos = 0;
  for (let i = 0; i < items.length; i++) {
    let correcto = getTargetResult(
      items[i],
      target,
      type === "condicional",
      prevTarget,
      items[i - 1]
    );
    if (correcto) correctos++;
  }

  let result = parseFloat((correctos / items.length) * 100).toFixed(2);

  return (
    <Chart type="radialBar" options={options} series={[result]} height={250} />
  );
};

export default ResultChart;
