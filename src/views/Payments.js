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
        <div>
          <div className="col">{payment.id}</div>
          <div className="col">
            {moment(payment.createdAt).format("DD MMM YYYY")}
          </div>
          <div className="col">{payment.test_amount}</div>
          <div className="col">
            {moment(payment.expiration_date).format("DD MMM YYYY")}
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container pt-3">
      <div className="row border-bottom pb-3 mb-3">
        <div className="col-md-6">
          <h1>Pagos</h1>
        </div>
        <div className="col-md-6 text-right"></div>
      </div>
      {renderPayments()}
    </div>
  );
};

export default Payments;
