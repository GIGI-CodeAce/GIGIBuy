import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./userContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { userInfo, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center">Checking authentication...</div>;
  }

  if (!userInfo || userInfo.error === "No token provided") {
    if (location.pathname === "/logout") {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
