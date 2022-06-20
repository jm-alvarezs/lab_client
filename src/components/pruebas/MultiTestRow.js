import { navigate } from "@reach/router";
import React from "react";

const MultiTestRow = ({ test }) => {
  const { idMultiTest, name, tests } = test;

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
      <td>{tests.length}</td>
      <td></td>
    </tr>
  );
};

export default MultiTestRow;
