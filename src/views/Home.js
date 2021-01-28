import { Router } from "@reach/router";
import React from "react";
import Navbar from "../components/Navbar";
import Cuenta from "./Cuenta";

const Home = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container">
        <Router>
          <Cuenta path="/cuenta" default />
        </Router>
      </div>
    </div>
  );
};

export default Home;
