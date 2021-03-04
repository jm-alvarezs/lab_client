import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";
import { UserContext } from "../context/UserContext";
import Home from "./Home";
import AtencionSimple from "./AtencionSimple";

const Main = () => {
  const { user, userLoggedIn } = useContext(UserContext);

  useEffect(() => {
    userLoggedIn();
  }, []);

  return (
    <div>
      <Router>
        <Login path="/entrar" default />
        <SignUp path="/registro" />
        {user !== null && (
          <>
            <Home path="/*" />
            <AtencionSimple path="/atencion/*" />
          </>
        )}
      </Router>
    </div>
  );
};

export default Main;
