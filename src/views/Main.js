import React from "react";
import AtencionSimple from "./AtencionSimple";
import { Router } from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";
import ConfigPrueba from "./ConfigPrueba";
import Resultados from "./Resultados";
import Navbar from "../components/Navbar";
import Usuarios from "./Usuarios";
import Pruebas from "./Pruebas";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Login path="/entrar" />
        <Pruebas path="/pruebas" />
        <SignUp path="/registro" />
        <ConfigPrueba path="/config" />
        <AtencionSimple path="/atencion/*" />
        <Resultados path="/resultados/:idPrueba" />
        <Usuarios path="/usuarios" />
      </Router>
    </div>
  );
};

export default Main;
