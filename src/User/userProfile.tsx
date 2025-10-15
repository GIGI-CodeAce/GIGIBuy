import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../userContext";
import { API_BASE } from "../api";
// import randomColor from "random-color";

function UserProfile() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const username = userInfo?.username;
  const [hoverCart, setHoverCart] = useState(false)
  const [hoverFav, setHoverFav] = useState(false)
  // const profileColor = randomColor(0.3, 0.99);
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
    <main className="text-center h-[80vh] font-[iconic] font-bold shadow-[#587789] transition-all justify-center items-center mx-auto sm:px-2 mt-10">
      <div className="bg-[#7eadc967] p-2 mx-auto max-w-screen-md rounded-2xl">
      <div className="bg-[#7eadc967] rounded-2xl mx-auto max-w-screen-md shadow-lg shadow-[#7eadc967] p-4">
         <div
        className={`w-[200px] h-[200px] rounded-[50%] bg-[#FFB6A6] font-[iconic] flex justify-center items-center border select-none mx-auto mt-4`}
        // style={{ backgroundColor: profileColor.hexString() }}
      >
        <h1 className="text-[124px] h-[195px]">{NameInitial}</h1>
      </div>
      <h1 className="text-xl mb-5">@{username}</h1>

      <div
      onClick={(()=> navigate('/cart'))}
      onMouseEnter={() => setHoverCart(true)}
          onMouseLeave={() => setHoverCart(false)}
          onTouchStart={() => setHoverCart(true)}
          onTouchEnd={()=> setHoverCart(false)} 
      className="w-[200px] hover:border-2 transition-all active:scale-96 border cursor-pointer rounded-xl mx-auto flex  m-2 p-1 text-start">
        <span>Shopping cart</span>
        <span className={`material-symbols-outlined select-none ml-auto ${hoverCart ? 'text-[#FFB6A6]': ''}`}>shopping_cart</span>
      </div>

      <div
      onClick={(()=> navigate('/favorites'))} 
            onMouseEnter={() => setHoverFav(true)}
          onMouseLeave={() => setHoverFav(false)}
          onTouchStart={() => setHoverFav(true)}
          onTouchEnd={()=> setHoverFav(false)} 
      className="w-[200px] hover:border-2 transition-all active:scale-96 border cursor-pointer rounded-xl mx-auto flex  m-2 p-1 text-start">
        <span>Favorite items</span>
        <span className={`material-symbols-outlined select-none ml-auto ${hoverFav ? 'text-[#FFB6A6]': ''}`}>favorite</span>
      </div>

      <div className="mt-20">
         <button 
      className="text-[#ffd5cc] w-[150px] cursor-pointer hover:text-[#d4b6af] transition-all active:scale-96 mx-auto border-black border bg-[#7eaec9] active:bg-[#85a7b9] rounded-2xl"
      onClick={logout}>Logout</button>

      <p className="text-gray-600 opacity-50 mt-5">
      Account created: {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>
      </div>
      </div>
    </main>
  );
}

export default UserProfile
