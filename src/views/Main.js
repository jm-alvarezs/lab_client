import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";
import { UserContext } from "../context/UserContext";
import Home from "./Home";
import AtencionSimple from "./AtencionSimple";
import ErrorAlert from "../components/global/ErrorAlert";
import SuccessAlert from "../components/global/SuccessAlert";
import Modal from "../components/global/Modal";
import AtencionCondicional from "./AtencionCondicional";
import AtencionHemi from "./AtencionHemi";
import AnswerCuestionario from "./AnswerCuestionario";
import TorreHanoi from "./TorreHanoi";
import FlankerTask from "./FlankerTask";
import MultiTest from "./MultiTest";
import StroopTest from "./tests/stroop/StroopTest";

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
            <Home user={user} path="/*" />
          </>
        )}
        <FlankerTask path="/flanker/*" />
        <TorreHanoi path="/hanoi/*" />
        <AtencionSimple path="/atencion/*" />
        <AtencionCondicional path="/atencion/condicional/*" />
        <AtencionHemi path="/atencion/hemi/*" />
        <StroopTest path="/stroop/*" />
        <AnswerCuestionario path="/cuestionario/answer/*" />
        <MultiTest path="/multi/*" />
      </Router>
      <Modal />
      <ErrorAlert />
      <SuccessAlert />
    </div>
  );
};

export default Main;
