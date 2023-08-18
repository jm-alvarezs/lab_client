import React from "react";
import { BASE_URL } from "../../utils";
import Chart from "react-apexcharts";

const ResumenHanoi = ({
  toPdf,
  aciertos,
  repetidos,
  resultado,
  percepcion,
  movimientos,
  aprendizaje,
  tiempoTotal,
  tiempoPromedio,
  tiempoReflexion,
  arrepentimiento,
}) => {
  const renderChart = () => {
    let aciertosPercent = aciertos / movimientos.length;
    let repetidosPercent = repetidos / movimientos.length;
    let perceptionPercent = percepcion / movimientos.length;
    let aprendizajePercent = aprendizaje / movimientos.length;
    let arrepentimientoPercent = arrepentimiento / movimientos.length;
    return (
      <Chart
        type="pie"
        options={{
          labels: [
            "Aciertos",
            "Repetidos",
            "Percepción",
            "Aprendizaje",
            "Arrepentimiento",
          ],
        }}
        series={[
          aciertosPercent,
          repetidosPercent,
          perceptionPercent,
          aprendizajePercent,
          arrepentimientoPercent,
        ]}
        height={300}
      />
    );
  };

  return (
    <div className="card container shadow-sm p-3 mb-4">
      <div className="row border-bottom pb-3 mb-2">
        <div className="col-6">
          <h3 className="bold">
            Prueba #{resultado !== null && resultado.test.id} - Torre de Hanoi
          </h3>
        </div>
        <div className="col-6 text-end">
          <button className="btn btn-outline-dark mx-2" onClick={toPdf}>
            <i className="fa fa-print"></i>
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() =>
              window.open(`${BASE_URL}/reports/${resultado.test.id}`, "_blank")
            }
          >
            <i className="far fa-file-excel"></i>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">{renderChart()}</div>

        <div className="col-12 col-md-6">
          {" "}
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
            <div className="col-6">Número de movimientos</div>
            <div className="col-6">{movimientos.length}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Tiempo Total</div>
            <div className="col-6">{tiempoTotal} segundos</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Tiempo medio por movimiento</div>
            <div className="col-6">{tiempoPromedio} ms</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Tiempo medio de reflexión</div>
            <div className="col-6">{tiempoReflexion} ms</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Error Tipo 1 (Percepción)</div>
            <div className="col-6">{percepcion}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Error Tipo 2 (Arrepentimiento)</div>
            <div className="col-6">{arrepentimiento}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Error Tipo 3 (Aprendizaje)</div>
            <div className="col-6">{aprendizaje}</div>
          </div>
          <div className="row py-2">
            <div className="col-6">Movimientos Revertidos</div>
            <div className="col-6">{repetidos}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenHanoi;
