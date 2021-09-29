import React from "react";

const Instrucciones = ({ contents }) => {
  return <div>{contents.map((content) => content)}</div>;
};

export default Instrucciones;
