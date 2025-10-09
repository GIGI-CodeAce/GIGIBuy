// ./User/Logout.tsx
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { API_BASE } from "../api";

function Logout() {
  const { setUserInfo } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_BASE}/logout`, {
      credentials: "include",
      method: "POST",
    })
      .finally(() => {
        setUserInfo(null)
        navigate("/")
      });
  }, [setUserInfo, navigate])

  return <div className="text-center mt-10">Logging out...</div>
}

export default Logout
