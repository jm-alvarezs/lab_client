import React, { useEffect } from "react";
import { useContext } from "react/cjs/react.development";
import { PaymentsContext } from "../context/PaymentsContext";
import moment from "moment";

const Payments = () => {
  const { payments, getMyPayments } = useContext(PaymentsContext);

  useEffect(() => {
    getMyPayments();
  }, []);

  const renderPayments = () => {
    if (Array.isArray(payments)) {
      if (payments.length === 0) {
        return <p>No hay pagos registrados en esta cuenta.</p>;
      }
      return payments.map((payment) => (
        <div className="row">
          <div className="container-fluid border p-2">
            <div className="row mx-0">
              <div className="col">{payment.id}</div>
              <div className="col">
                {moment(payment.createdAt).format("DD MMM YYYY")}
              </div>
              <div className="col">{payment.test_amount}</div>
              <div className="col">
                {moment(payment.expiration_date).format("DD MMM YYYY")}
              </div>
              <div className="col">
                {payment.status === "pending" ? (
                  <span className="badge badge-pill bg-warning text-dark">
                    Pendiente
                  </span>
                ) : payment.status === "completed" ? (
                  <span className="badge badge-pill bg-success text-white">
                    Completado
                  </span>
                ) : (
                  <span className="badge badge-pill bg-secondary text-capitalize">
                    {payment.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container pt-3">
      <div className="row mb-3">
        <div className="col-md-6">
          <h1>Pagos</h1>
        </div>
        <div className="col-md-6 text-end"></div>
      </div>
      <div className="row bg-light p-2 border bold">
        <div className="col">#ID</div>
        <div className="col">Fecha</div>
        <div className="col">Pruebas</div>
        <div className="col">Expiración</div>
        <div className="col">Estado</div>
      </div>
      {renderPayments()}
    </div>
  );
};

export default Payments;
