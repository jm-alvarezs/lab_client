import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function () {
  const { showAlert, clearAlert, alertContent } = useContext(ModalContext);
  return (
    <div
      className={`alert alert-danger alert-dismissible fixed-top ms-auto me-2 mt-4 fade-show ${
        !showAlert ? "hidden" : ""
      }`}
      role="alert"
      style={{ maxWidth: 500, zIndex: 2500 }}
    >
      {alertContent}
      <button
        type="button"
        className="btn btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={clearAlert}
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}
