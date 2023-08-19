import React, { useContext, useEffect, useState } from "react";
import { searchRows } from "../../utils";
import { MultiTestContext } from "../../context/MultiTestContext";
import MultiTestRow from "../../components/pruebas/MultiTestRow";

const MultiTestList = () => {
  const [query, setQuery] = useState("");

  const { multitests, getMultiTests } = useContext(MultiTestContext);

  useEffect(() => {
    getMultiTests();
  }, []);

  const renderPruebas = () => {
    if (multitests && multitests !== null) {
      let testsRender = [...multitests];
      if (query !== "") {
        testsRender = searchRows(query, testsRender);
      }
      if (testsRender.length === 0) {
        return (
          <tr>
            <td colSpan="4">
              <p>No hay estudios registrados</p>
            </td>
          </tr>
        );
      }
      return testsRender.map((test) => (
        <MultiTestRow key={test.idMultiTest} test={test} />
      ));
    }
    return (
      <tr>
        <td>
          <div className="spinner-border"></div>
        </td>
      </tr>
    );
  };

  return (
    <div className="container">
      <div className="row mx-0 border-bottom pb-3 mb-3 mt-4 align-items-center">
        <div className="col-6 px-0">
          <h1>Estudios</h1>
        </div>
        <div className="col-6 text-end px-0">
          {/*
          <Link to="/tests/new/edit" className="btn btn-primary">
            + Crear
          </Link>
          */}
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o id.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="row mx-0">
        <div className="container container-x card">
          <table className="table mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ejercicios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{renderPruebas()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MultiTestList;
