import { useState,useEffect,useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router";
import { API_BASE } from "../api";
import randomColor from 'random-color'

function UserProfile() {
      const { setUserInfo, userInfo } = useContext(UserContext)
      const navigate = useNavigate()
      const username = userInfo?.username
      const profileColor = randomColor(0.3, 0.99)
      const NameInitial = username?.[0].toLocaleUpperCase()
      

      useEffect(() => {
      fetch(`${API_BASE}/profile`, {
        method: 'GET',
        credentials: 'include',
      }).then(res => {
        res.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      });
    }, [])


  return (
    <>
      <main className="text-center h-[100vh]">
        <div className={`w-[200px] h-[200px] bg-${profileColor} rounded-[50%] font-[iconic] flex justify-center items-center border select-none mx-auto mt-4`}>
          <h1 className="text-[124px] h-[195px]">{NameInitial}</h1>
        </div>
        <h1 className="text-xl">@{username}</h1>
      </main>
    </>
  );
}

export default UserProfile;
