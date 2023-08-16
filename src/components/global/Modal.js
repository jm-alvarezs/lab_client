import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function () {
  const { title, content, component, children, onCancel, onSuccess } =
    useContext(ModalContext);
  return (
    <div
      className="modal fade"
      id="modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modal"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
          )}
          <div className="modal-body">
            {content}
            {component}
            {children}
          </div>
          {(onSuccess || onCancel) && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-dismiss="modal"
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSuccess}
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
