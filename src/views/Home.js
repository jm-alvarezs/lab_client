import { Router } from "@reach/router";
import React from "react";
import Cuenta from "./Cuenta";
import Pruebas from "./Pruebas";
import Results from "./Results";
import Usuarios from "./Usuarios";
import Payments from "./Payments";
import Pacientes from "./Pacientes";
import Cuestionario from "./Cuestionario";
import PacienteForm from "./PacienteForm";
import SingleResults from "./SingleResults";
import SinglePaciente from "./SinglePaciente";
import MultiConfig from "./config/MultiConfig";
import ConfigHanoi from "./config/ConfigHanoi";
import ResultadosHanoi from "./ResultadosHanoi";
import Navbar from "../components/global/Navbar";
import ConfigFlanker from "./config/ConfigFlanker";
import ResultadosFlanker from "./ResultadosFlanker";
import ConfigAtencion from "./config/ConfigAtencion";
import MultiTestList from "./multitest/MultiTestList";
import ConfigStroop from "./tests/stroop/ConfigStroop";
import StroopResults from "./tests/stroop/StroopResults";
import MultiTestConfig from "./multitest/MultiTestConfig";
import ConfigCondicional from "./config/ConfigCondicional";
import PanelNavbar from "../components/global/PanelNavbar";
import ConfigHemiAtencion from "./config/ConfigHemiAtencion";
import ResultadosCuestionario from "./ResultadosCuestionario";

const Home = ({ user }) => {
  return (
    <div className="container-fluid px-0">
      <Navbar user={user} />
      <div className="sidebar">
        <PanelNavbar />
      </div>
      <div className="main-panel bg-light px-4">
        <div className="content overflow-x-hidden">
          <Router>
            {/*Pruebas */}
            <Pruebas path="/tests" />
            <ConfigAtencion path="/config/atencion/:idPaciente" />
            <ConfigCondicional path="/config/condicional/:idPaciente" />
            <ConfigHemiAtencion path="/config/hemi/:idPaciente" />
            <ConfigHanoi path="/config/hanoi/:idPaciente" />
            <ConfigFlanker path="/config/flanker/:idPaciente" />
            <ConfigStroop path="/config/stroop/:idPaciente" />
            <MultiConfig path="/config/multi/:idPaciente/*" />
            {/* MultiTest Standalone */}
            <MultiTestList path="/studies" />
            <MultiTestConfig path="/studies/:idMultiTest/edit" />
            {/* Resultados */}
            <Results path="/results/*" />
            <SingleResults path="/resultados/atencion/:id" />
            <SingleResults path="/resultados/condicional/:id" />
            <SingleResults path="/resultados/hemi/:id" />
            <ResultadosHanoi path="/resultados/hanoi/:idTest" />
            <ResultadosFlanker path="/resultados/flanker/:idTest" />
            <StroopResults path="/resultados/stroop/:id" />
            {/* Pacientes */}
            <Pacientes path="/patients" default />
            <SinglePaciente path="/patients/:id" />
            <PacienteForm path="/patients/:id/edit" />
            {/* Cuenta */}
            <Cuenta path="/cuenta" />
            {/* Cuestionarios */}
            <Cuestionario path="/cuestionario/:tipo/:idPaciente" />
            <ResultadosCuestionario path="/resultados/cuestionario/:id" />
            {/* Payments */}
            <Payments path="/payments" />
            {/* Admin */}
            {user.isAdmin && <Pacientes path="/admin/patients" admin={true} />}
            {user.isAdmin && <Results path="/admin/resultados" admin={true} />}
            {user.isAdmin && <Usuarios path="/admin/usuarios" admin={true} />}
          </Router>
        </div>
      </div>
    </div>
  );
};

export default Home;
