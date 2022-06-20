import { Router } from "@reach/router";
import React from "react";
import Navbar from "../components/global/Navbar";
import ConfigAtencion from "./config/ConfigAtencion";
import ConfigCondicional from "./config/ConfigCondicional";
import Cuenta from "./Cuenta";
import Pacientes from "./Pacientes";
import Pruebas from "./Pruebas";
import Results from "./Results";
import SinglePaciente from "./SinglePaciente";
import SingleResults from "./SingleResults";
import ResultadosCuestionario from "./ResultadosCuestionario";
import Cuestionario from "./Cuestionario";
import ConfigHemiAtencion from "./config/ConfigHemiAtencion";
import AnswerCuestionario from "./AnswerCuestionario";
import Usuarios from "./Usuarios";
import PacienteForm from "./PacienteForm";
import ConfigHanoi from "./config/ConfigHanoi";
import ResultadosHanoi from "./ResultadosHanoi";
import ConfigFlanker from "./config/ConfigFlanker";
import ResultadosFlanker from "./ResultadosFlanker";
import MultiConfig from "./config/MultiConfig";
import ConfigStroop from "./tests/stroop/ConfigStroop";
import StroopResults from "./tests/stroop/StroopResults";
import Payments from "./Payments";
import MultiTestList from "./multitest/MultiTestList";
import MultiTestConfig from "./multitest/MultiTestConfig";
import MultiTestRun from "./multitest/MultiTestRun";

const Home = ({ user }) => {
  return (
    <div className="container-fluid px-0">
      <Navbar user={user} />
      <div className="container-fluid px-0">
        <Router>
          {/*Pruebas */}
          <Pruebas path="/pruebas" />
          <ConfigAtencion path="/config/atencion/:idPaciente" />
          <ConfigCondicional path="/config/condicional/:idPaciente" />
          <ConfigHemiAtencion path="/config/hemi/:idPaciente" />
          <ConfigHanoi path="/config/hanoi/:idPaciente" />
          <ConfigFlanker path="/config/flanker/:idPaciente" />
          <ConfigStroop path="/config/stroop/:idPaciente" />
          <MultiConfig path="/config/multi/:idPaciente/*" />
          {/* MultiTest Standalone */}
          <MultiTestList path="/tests" />
          <MultiTestConfig path="/tests/:idMultiTest/edit" />
          {/* Resultados */}
          <Results path="/resultados" />
          <SingleResults path="/resultados/atencion/:id" />
          <SingleResults path="/resultados/condicional/:id" />
          <SingleResults path="/resultados/hemi/:id" />
          <ResultadosHanoi path="/resultados/hanoi/:idTest" />
          <ResultadosFlanker path="/resultados/flanker/:idTest" />
          <StroopResults path="/resultados/stroop/:id" />
          {/* Pacientes */}
          <Pacientes path="/pacientes" default />
          <SinglePaciente path="/pacientes/:id" />
          <PacienteForm path="/pacientes/:id/edit" />
          {/* Cuenta */}
          <Cuenta path="/cuenta" />
          {/* Cuestionarios */}
          <Cuestionario path="/cuestionario/:tipo/:idPaciente" />
          <AnswerCuestionario path="/cuestionario/:tipo" />
          <ResultadosCuestionario path="/resultados/cuestionario/:id" />
          {/* Payments */}
          <Payments path="/payments" />
          {/* Admin */}
          {user.isAdmin && <Pacientes path="/admin/pacientes" admin={true} />}
          {user.isAdmin && <Results path="/admin/resultados" admin={true} />}
          {user.isAdmin && <Usuarios path="/admin/usuarios" admin={true} />}
        </Router>
      </div>
    </div>
  );
};

export default Home;
