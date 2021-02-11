import React, { useContext, useState } from "react";
import { PruebasContext } from "../context/PruebasContext";

const ConfigPrueba = () => {
  const [config, setConfig] = useState({});

  const { postPrueba } = useContext(PruebasContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postPrueba(config);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container px-0 mt-2 narrow">
          <h1>Configuración - Atención Simple</h1>
          <div className="card p-3 mb-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <label>Nombre de la Prueba</label>
                </div>
                <div className="col-6">
                  <input type="text" className="form-control mb-3" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Sujeto</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Escribe para buscar..."
                  />
                </div>
              </div>
              <h2>Parámetros</h2>
              <div className="row">
                <div className="col-6">
                  <label>Tiempo de Exposición</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="milisegundos (ms)"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tiempo Interestimular</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="milisegundos (ms)"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Target</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="[A-Z]"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tipo de Letra</label>
                </div>
                <div className="col-6">
                  <select className="form-control mb-3">
                    <option>Courier</option>
                    <option>Montserrat</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Estilo de Fuente</label>
                </div>
                <div className="col-6">
                  <select className="form-control mb-3">
                    <option>Normal</option>
                    <option>Negrita</option>
                    <option>Cursiva</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Color de la Fuente</label>
                </div>
                <div className="col-6">
                  <input type="color" className="form-control mb-3" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Tamaño de la Fuente</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="pixeles (px)"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Color del fondo</label>
                </div>
                <div className="col-6">
                  <input type="color" className="form-control mb-3" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Número de Estímulos</label>
                </div>
                <div className="col-6">
                  <input type="number" className="form-control mb-3" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Aparición del Target</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="%"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Botón o tecla de respuesta</label>
                </div>
                <div className="col-6">
                  <select className="form-control mb-3">
                    <option>Espacio</option>
                    <option>Intro</option>
                    <option>Cualquiera</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Duración</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="segundos (s)"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Terminado
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPrueba;
