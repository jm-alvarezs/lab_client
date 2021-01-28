import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Cuenta = () => {
  const { user } = useContext(UserContext);

  const renderUser = () => {
    if (user && user !== null) {
      const {
        name,
        email,
        profession,
        institution,
        birthDate,
        country,
        scholarship,
      } = user;
      return (
        <div className="container-fluid">
          <h2>{name}</h2>
          <p>{email}</p>
          <p>{profession}</p>
          <p>{institution}</p>
          <p>{birthDate}</p>
          <p>{country}</p>
          <p>{scholarship}</p>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <h1>Mi Cuenta</h1>
        <div className="card p-3 shadow-sm">{renderUser()}</div>
      </div>
    </div>
  );
};

export default Cuenta;
