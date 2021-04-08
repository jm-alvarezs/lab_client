import React from "react";

const SearchResults = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="border-bottom pb-3 mb-3">Buscador</h1>
      <div className="card p-3">
        <form onSubmit={handleSubmit}>
          <label>Correo Electrónico</label>
          <input type="text" className="form-control mb-3" />
          <label>Tipo de Prueba</label>
          <select className="form-control mb-3">
            <option value="1">Atención Simple</option>
            <option value="2">Atención Condicional</option>
          </select>
          <label>Fecha de la Prueba</label>
          <input type="date" className="form-control mb-3" />
          <button type="submit" className="btn btn-dark w-100 mt-2">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchResults;
