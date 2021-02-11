import { Router } from "@reach/router";
import React from "react";
import Navbar from "../components/Navbar";
import ConfigPrueba from "./ConfigPrueba";
import Cuenta from "./Cuenta";

const Home = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container">
        <Router>
          <Cuenta path="/cuenta" default />
          <ConfigPrueba path="/config" />
        </Router>
      </div>
    </div>
  );
};

export default Home;
