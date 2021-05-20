import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";

const Breadcrumbs = ({ elements }) => {
  const renderElements = () => {
    if (elements && elements !== null) {
      if (Array.isArray(elements)) {
        return elements.map((element, index) => (
          <Link
            key={element.href}
            to={element.href}
            className="text-muted text-underline"
          >
            {element.name.toLowerCase().includes("regresar") ? "< " : ""}
            {element.name}
            {index < elements.length - 1 ? " > " : ""}
          </Link>
        ));
      }
    }
  };
  return <div className="container-fluid my-2 px-0">{renderElements()}</div>;
};
export default Breadcrumbs;
