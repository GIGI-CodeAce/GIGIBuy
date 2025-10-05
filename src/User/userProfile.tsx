import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../userContext";
import { API_BASE } from "../api";
import randomColor from "random-color";

function UserProfile() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const username = userInfo?.username;
  const profileColor = randomColor(0.3, 0.99);
  const NameInitial = username?.[0]?.toUpperCase();


  useEffect(() => {
    fetch(`${API_BASE}/profile`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);

        if (data.error === "No token provided") {
          navigate("/");
        }
      })
      .catch(() => navigate("/"));
  }, [setUserInfo, navigate]);

  function logout() {
    const LogoutConfirm = window.confirm("Are you sure you want to log out?");
    if (LogoutConfirm) {
      fetch(`${API_BASE}/logout`, {
        credentials: "include",
        method: "POST",
      }).then(() => {
        setUserInfo(null)
        navigate("/")
      });
    }
  }



  return (
    <main className="text-center h-[100vh]">
      <div
        className={`w-[200px] h-[200px] rounded-[50%] font-[iconic] flex justify-center items-center border select-none mx-auto mt-4`}
        style={{ backgroundColor: profileColor.hexString() }} // ✅ fix dynamic color
      >
        <h1 className="text-[124px] h-[195px]">{NameInitial}</h1>
      </div>
      <h1 className="text-xl">@{username}</h1>
      <button onClick={logout}>Logout</button>

      <p>Account created: {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : 'N/A'}</p>
    </main>
  );
}

export default UserProfile
