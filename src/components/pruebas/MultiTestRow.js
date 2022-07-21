import { navigate } from "@reach/router";
import React from "react";

const MultiTestRow = ({ test }) => {
  const { idMultiTest, name, tests } = test;

  const getTestNumber = () => {
    return tests.filter((test) => test.idPatient === null).length;
  };

  return (
    <tr
      className="usuario-row"
      onClick={() => navigate(`/tests/${idMultiTest}/edit`)}
    >
      <td>
        {"#"}
        {idMultiTest}
      </td>
      <td>{name}</td>
      <td>{getTestNumber()}</td>
      <td></td>
    </tr>
  );
};

export default MultiTestRow;
