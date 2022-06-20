import React, { useState } from "react";

const MultiTestStart = () => {
  const [hasUser, setHasUser] = useState(null);
  const findCurrentUser = () => {
    let user = window.localStorage.getItem("user");
    if (user !== null) {
      user = JSON.parse(user);
    }
    return user;
  };

  const renderSignUpForm = () => {
    if (hasUser !== null) {
      if (hasUser) {
      } else {
        return (
          <form>
            <label>Nombre</label>
            <input type="text" className="form-control" />
            <label>Correo Electrónico</label>
            <input type="email" className="form-control" />
          </form>
        );
      }
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="row">
      <div className="col col-md-6 border-right shadow bg-light">
        <div className="row align-items-center vh-100">
          <div className="p-5">
            <h1>Bienvenido</h1>
            <p className="instrucciones">
              A continuación realizarás un ejercicio.
            </p>
            <h3>Instrucciones</h3>
            <button className="btn btn-dark">Comenzar</button>
          </div>
        </div>
      </div>
      <div className="col col-md-6 px-0">
        <img
          src="https://www.udem.edu.mx/sites/default/files/inline-images/Entropia-UDEM.jpg"
          className="half-image"
        />
      </div>
    </div>
  );
};

export default MultiTestStart;
