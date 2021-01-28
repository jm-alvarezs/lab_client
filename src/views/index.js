import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import { UserContext } from "../context/UserContext";

const Main = () => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Login path="/entrar" default />
      <SignUp path="/registro" />
      {user !== null && <Home path="/*" />}
    </Router>
  );
};

export default Main;
