import { Router } from "@reach/router";
import React from "react";
import Navbar from "../components/Navbar";
import ConfigPrueba from "./ConfigPrueba";
import Cuenta from "./Cuenta";
import Pruebas from "./Pruebas";
import Results from "./Results";
import SingleResults from "./SingleResults";
import Usuarios from "./Usuarios";

const Home = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container-fluid">
        <Router>
          <Pruebas path="/pruebas" default />
          <Results path="/resultados" />
          <SingleResults path="/resultados/:idPrueba/:id" />
          <Usuarios path="/usuarios" />
          <Cuenta path="/cuenta" />
          <ConfigPrueba path="/config" />
        </Router>
      </div>
    </div>
  );
};

export default Home;
