import React from "react";
import AtencionSimple from "./AtencionSimple";
import { Router } from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";

const Main = () => {
  return (
    <Router>
      <Login path="/entrar" />
      <SignUp path="/registro" />
      <AtencionSimple path="/atencion/*" />
    </Router>
  );
};

export default Main;
