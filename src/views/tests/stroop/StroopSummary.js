import React from "react";

const StroopSummary = ({ test }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6"></div>
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
