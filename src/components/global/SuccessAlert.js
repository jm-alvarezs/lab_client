import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function () {
  const { showSuccess, clearSuccess, successContent } =
    useContext(ModalContext);

  return (
    <div
      className={`alert alert-success alert-dismissible fixed-top ms-auto me-2 fade-show mt-2 ${
        !showSuccess ? "hidden" : ""
      }`}
      role="alert"
      style={{ maxWidth: 500, zIndex: 2500 }}
    >
      {successContent}
      <button
        type="button"
        className="btn text-muted ml-auto mr-0"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={clearSuccess}
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}
