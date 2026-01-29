import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Rules from "./pages/Rules";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

// ✅ Login protection
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const PaidRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  if (!token || !userRaw) return <Navigate to="/login" replace />;

  let user: any;
  try {
    user = JSON.parse(userRaw);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (user.paymentStatus !== "paid") {
    return <Navigate to="/payment" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 💳 Payment */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* 📜 Rules (paid users only) */}
        <Route
          path="/rules"
          element={
            <PaidRoute>
              <Rules />
            </PaidRoute>
          }
        />

        {/* 🧠 Quiz (paid users only) */}
        <Route
          path="/quiz"
          element={
            <PaidRoute>
              <Quiz />
            </PaidRoute>
          }
        />

        {/* 🏆 Result (paid users only) */}
        <Route
          path="/result"
          element={
            <PaidRoute>
              <Result />
            </PaidRoute>
          }
        />

        {/* ❌ fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
