import React from "react";
import Chart from "react-apexcharts";
import { getChartSeries } from "../../utils";

const ChartCUPOM = ({ questions }) => {
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
          data: getChartSeries("cupom", questions),
        },
      ]}
    />
  );
};

export default ChartCUPOM;
