import React from "react";
import { BASE_URL } from "../../utils";
import Chart from "react-apexcharts";

const ResumenFlanker = ({
  toPdf,
  resultado,
  estimulos,
  errores,
  aciertos,
  omisiones,
  tiempoPromedio,
  erroresNeutrales,
  erroresDireccion,
  erroresCongruentes,
  erroresIncongruentes,
}) => {
  const renderChart = () => {
    const aciertosPercent = aciertos / estimulos.length;
    const omisionesPercent = omisiones / estimulos.length;
    const erroresNeutralesPercent = erroresNeutrales / estimulos.length;
    const erroresDireccionPercent = erroresDireccion / estimulos.length;
    const erroresCongruentesPercent = erroresCongruentes / estimulos.length;
    const erroresIncongruentesPercent = erroresIncongruentes / estimulos.length;
    return (
      <Chart
        type="pie"
        options={{
          labels: [
            "Aciertos",
            "Omisiones",
            "Errores Neutrales",
            "Errores Dirección",
            "Errores Congruentes",
            "Errores Incongruentes",
          ],
        }}
        series={[
          aciertosPercent,
          omisionesPercent,
          erroresNeutralesPercent,
          erroresDireccionPercent,
          erroresCongruentesPercent,
          erroresIncongruentesPercent,
        ]}
      />
    );
  };

  const renderCompletada = () => {
    if (estimulos && estimulos !== null) {
      return (
        <>
          <div className="row py-2">
            <div className="col-6">Tiempo medio de reacción</div>
            <div className="col-6">
              {tiempoPromedio}
              {" ms"}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores Totales</div>
            <div className="col-6">{errores}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores de Dirección</div>
            <div className="col-6">{erroresDireccion}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Omisiones</div>
            <div className="col-6">{omisiones}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores en Congruentes</div>
            <div className="col-6">{erroresCongruentes}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores en Incongruentes</div>
            <div className="col-6">{erroresIncongruentes}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Errores en Neutrales</div>
            <div className="col-6">{erroresNeutrales}</div>
          </div>
        </>
      );
    }
    return <h4 className="text-danger mt-3">Prueba Sin Realizar</h4>;
  };

  return (
    <div className="card container shadow-sm p-3 mb-4">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-2">{renderChart()}</div>
        <div className="col-12 col-md-6 mb-2">
          <div className="row border-bottom pb-3 mb-2">
            <div className="col-6">
              <h3 className="bold">
                Prueba #{resultado !== null && resultado.test.id} - Flanker Task
              </h3>
            </div>
            <div className="col-6 text-end">
              <button className="btn btn-outline-dark mx-2" onClick={toPdf}>
                <i className="fa fa-print"></i>
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() =>
                  window.open(
                    `${BASE_URL}/reports/${resultado.test.id}`,
                    "_blank"
                  )
                }
              >
                <i className="far fa-file-excel"></i>
              </button>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Prueba Completada</div>
            <div className="col-6">
              <i
                className={
                  resultado.results.finished
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
              ></i>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">Número de Estímulos</div>
            <div className="col-6">{resultado.settings.estimulosPrueba}</div>
          </div>
          {renderCompletada()}
        </div>
      </div>
    </div>
  );
};

export default ResumenFlanker;
