import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "./userContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { userInfo, loading } = useContext(UserContext)

  if (loading) {
    return <div className="text-center">Checking authentication...</div>;
  }

  if (!userInfo) {
    return <Navigate to="/register" replace />;
  }

  return children
}

export default ProtectedRoute
