import { Router } from "@reach/router";
import React from "react";
import Navbar from "../components/Navbar";
import ConfigPrueba from "./ConfigPrueba";
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
          <Pruebas path="/pruebas" default />
          <ConfigPrueba path="/config" />
          {/* Resultados */}
          <Results path="/resultados" />
          <SingleResults path="/resultados/:id" />
          {/* Pacientes */}
          <Pacientes path="/usuarios" />
          <SinglePaciente path="/usuarios/:id" />
          {/* Cuenta */}
          <Cuenta path="/cuenta" />
        </Router>
      </div>
    </div>
  );
};

export default Home;
