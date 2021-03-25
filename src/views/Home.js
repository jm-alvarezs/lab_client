import { Router } from "@reach/router";
import React from "react";
import Navbar from "../components/Navbar";
import ConfigAtencion from "./ConfigAtencion";
import ConfigCondicional from "./ConfigCondicional";
import Cuenta from "./Cuenta";
import Pacientes from "./Pacientes";
import Pruebas from "./Pruebas";
import Results from "./Results";
import SinglePaciente from "./SinglePaciente";
import SingleResults from "./SingleResults";

const Home = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container-fluid">
        <Router>
          {/*Pruebas */}
          <Pruebas path="/pruebas" />
          <ConfigAtencion path="/config/atencion/:idPaciente" />
          <ConfigCondicional path="/config/condicional/:idPaciente" />
          {/* Resultados */}
          <Results path="/resultados" />
          <SingleResults path="/resultados/:id" />
          {/* Pacientes */}
          <Pacientes path="/pacientes" default />
          <SinglePaciente path="/pacientes/:id" />
          {/* Cuenta */}
          <Cuenta path="/cuenta" />
        </Router>
      </div>
    </div>
  );
};

export default Home;
