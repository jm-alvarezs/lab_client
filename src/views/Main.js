import React from "react";
import AtencionSimple from "./AtencionSimple";
import { Router } from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";
import ConfigPrueba from "./ConfigPrueba";
import Resultados from "./Resultados";

const Main = () => {
  return (
    <Router>
      <Login path="/entrar" />
      <SignUp path="/registro" />
      <ConfigPrueba path="/config/:idPrueba" />
      <AtencionSimple path="/atencion/*" />
      <Resultados path="/resultados/:idPrueba" />
    </Router>
  );
};

export default Main;
