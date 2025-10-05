import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./userContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { userInfo, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center">Checking authentication...</div>;
  }

  // If user not logged in
  if (!userInfo || userInfo.error === "No token provided") {
    // 👇 If user is trying to log out, send them to homepage
    if (location.pathname === "/logout") {
      return <Navigate to="/" replace />;
    }

    // 👇 For all other protected pages, go to register
    return <Navigate to="/register" replace />;
  }

  return children;
}

export default ProtectedRoute;
