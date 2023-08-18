import React from "react";
import Chart from "react-apexcharts";

const StroopSummary = ({ test }) => {
  const renderChart = () => {
    if (test.results && test.results !== null) {
      let aciertosCongruentes =
        test.results.congruentes / test.estimulos.length;

      let aciertosIncongruentes =
        test.results.incongruentes / test.estimulos.length;

      let erroresCongruentes =
        test.results.erroresCongruentes / test.estimulos.length;

      let erroresIncongruentes =
        test.results.erroresIncongruentes / test.estimulos.length;
      return (
        <Chart
          type="pie"
          options={{
            labels: [
              "Aciertos Congruentes",
              "Aciertos Incongruentes",
              "Errores Congruentes",
              "Errores Incongruentes",
            ],
          }}
          series={[
            aciertosCongruentes,
            aciertosIncongruentes,
            erroresCongruentes,
            erroresIncongruentes,
          ]}
        />
      );
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6">{renderChart()}</div>
        <div className="col col-md-6">
          <div className="row">
            <div className="col-6"># Estimulos</div>
            <div className="col-6">{test.estimulos.length}</div>
          </div>
          <div className="row">
            <div className="col-6"># Congruentes</div>
            <div className="col-6">{test.results.allCongruentes}</div>
          </div>
          <div className="row">
            <div className="col-6"># Incongruentes</div>
            <div className="col-6">{test.results.allIncongruentes}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">Aciertos</div>
            <div className="col-6">{test.results.aciertos}</div>
          </div>
          <div className="row">
            <div className="col-6">Aciertos Congruentes</div>
            <div className="col-6">{test.results.congruentes}</div>
          </div>

          <div className="row">
            <div className="col-6">Aciertos Incongruentes</div>
            <div className="col-6">{test.results.incongruentes}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">Errores</div>
            <div className="col-6">
              {test.results.erroresCongruentes +
                test.results.erroresIncongruentes}
            </div>
          </div>

          <div className="row">
            <div className="col-6">Errores Congruentes</div>
            <div className="col-6">{test.results.erroresCongruentes}</div>
          </div>

          <div className="row">
            <div className="col-6">Errores Incongruentes</div>
            <div className="col-6">{test.results.erroresIncongruentes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StroopSummary;
