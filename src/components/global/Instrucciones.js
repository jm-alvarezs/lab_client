import React from "react";

const Instrucciones = ({ contents }) => {
  return (
    <div>
      {contents.map((content, index) => (
        <div key={index}>{content}</div>
      ))}
    </div>
  );
};

export default Instrucciones;
