import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

const PaymentGuard = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ If not paid → redirect to pay
  if (user.paymentStatus !== "paid") {
    return <Navigate to="/pay" />;
  }

  return children;
};

export default PaymentGuard;
