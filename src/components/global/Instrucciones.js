import React from "react";

const Instrucciones = ({ contents }) => {
  return (
    <div>
      {contents.map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </div>
  );
};

export default Instrucciones;
