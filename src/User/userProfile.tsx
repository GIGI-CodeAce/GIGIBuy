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
    <main className="text-center h-[80vh] font-[iconic] font-bold mt-5">

      <div className="bg-[#7eadc967] rounded-2xl mx-auto max-w-screen-md shadow-lg shadow-[#7eadc967] p-4">
         <div
        className={`w-[200px] h-[200px] rounded-[50%] font-[iconic] flex justify-center items-center border select-none mx-auto mt-4`}
        style={{ backgroundColor: profileColor.hexString() }}
      >
        <h1 className="text-[124px] h-[195px]">{NameInitial}</h1>
      </div>
      <h1 className="text-xl mb-5">@{username}</h1>

      <div
      onClick={(()=> navigate('/cart'))} 
      className="w-[200px] transition-all active:scale-96 border cursor-pointer rounded-xl mx-auto flex  m-2 p-1 text-start">
        <span>Shopping cart</span>
        <span className="material-symbols-outlined select-none ml-auto">shopping_cart</span>
      </div>

      <div
      onClick={(()=> navigate('/favorites'))} 
      className="w-[200px] transition-all active:scale-96 border cursor-pointer rounded-xl mx-auto flex  m-2 p-1 text-start">
        <span>Favorite items</span>
        <span className="material-symbols-outlined select-none ml-auto">favorite</span>
      </div>

      <div className="mt-20">
         <button 
      className="text-[#ffd5cc] w-[150px] cursor-pointer transition-all active:scale-96 mx-auto border-black border bg-[#a0c4d7] hover:bg-[#90bad0] active:bg-[#7eaec9] rounded-2xl"
      onClick={logout}>Logout</button>

      <p className="text-gray-600 opacity-50 mt-5">
      Account created: {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>
      </div>
    </main>
  );
}

export default UserProfile
