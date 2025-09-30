import { useState,useEffect,useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router";
import { API_BASE } from "../api";

function UserProfile() {
      const { setUserInfo, userInfo } = useContext(UserContext);
      const navigate = useNavigate()

      useEffect(() => {
      fetch(`${API_BASE}/profile`, {
        method: 'GET',
        credentials: 'include',
      }).then(res => {
        res.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      });
    }, []);

// useEffect(() => {
//   if (!userInfo) {
//     navigate("/register");
//   }
// }, [])

    const username = userInfo?.username

  return (
    <>
      <main className="text-center">
          <div>
                  User profile {username}
        </div>
      </main>
    </>
  );
}

export default UserProfile;
