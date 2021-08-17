import { Router } from "@reach/router";
import React from "react";
import Navbar from "../components/global/Navbar";
import ConfigAtencion from "./ConfigAtencion";
import ConfigCondicional from "./ConfigCondicional";
import Cuenta from "./Cuenta";
import Pacientes from "./Pacientes";
import Pruebas from "./Pruebas";
import Results from "./Results";
import SinglePaciente from "./SinglePaciente";
import SingleResults from "./SingleResults";
import ResultadosCuestionario from "./ResultadosCuestionario";
import Cuestionario from "./Cuestionario";
import ConfigHemiAtencion from "./ConfigHemiAtencion";
import AnswerCuestionario from "./AnswerCuestionario";
import Usuarios from "./Usuarios";
import PacienteForm from "./PacienteForm";
import ConfigHanoi from "./ConfigHanoi";
import TorreHanoi from "./TorreHanoi";

const Home = ({ user }) => {
  return (
    <div className="container-fluid">
      <Navbar user={user} />
      <div className="container-fluid">
        <Router>
          {/*Pruebas */}
          <Pruebas path="/pruebas" />
          <ConfigAtencion path="/config/atencion/:idPaciente" />
          <ConfigCondicional path="/config/condicional/:idPaciente" />
          <ConfigHemiAtencion path="/config/hemi/:idPaciente" />
          <ConfigHanoi path="/config/hanoi/:idPaciente" />
          <TorreHanoi path="/hanoi" />
          {/* Resultados */}
          <Results path="/resultados" />
          <SingleResults path="/resultados/:id" />
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
