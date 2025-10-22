import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { API_BASE } from "../api";

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()
  const {setUserInfo} = useContext(UserContext)
  const [warningDisplay, setWarningDisplay] = useState(false)
  const inputStyle = 'p-2 border rounded-lg bg-gray-100'

    useEffect(()=>{
    setWarningDisplay(false)
  }, [username,password])

async function Login(e:any) {
    e.preventDefault();

    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

        if (!response.ok) {
          if (username === '' && password === '') {
            setWarningDisplay(true);
    return;
    }
          setWarningDisplay(true)
    } else {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    setUsername('')
    setPassword('')
    }

  }

  if(redirect){
    return <Navigate to={"/profile"}/>
  }

  return (
 <main>
  <div className="inset-0 z-0 h-screen opacity-11 absolute w-full bg-[url('./assets/rotatediamond.png')] bg-[length:100px_100px] bg-repeat"></div>
    <main className="relative z-10 max-w-screen-lg mx-auto sm:px-2 transition-all px-0 mt-10">
      <div className="bg-[#7eadc9af] rounded-t-xl pb-1 h-5 mt-5"></div>
  <div className="flex relative sm:static items-center bg-[#7eaec9] justify-between gap-10 px-4 py-2 pb-5">

    <div className="w-35/100 text-center flex flex-col items-center justify-center font-[iconic]">
            <img className="w-[100px]"
      src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//diamondFixed.png"/>
      <h1 className="font-bold text-2xl sm:text-3xl underline">Login</h1>
      <h1 className="font-bold text-sm sm:text-lg">connect your account</h1>
    </div>

    <div className="w-65/100 flex-1 flex items-center justify-center">
      <form
        className="flex flex-col w-full max-w-sm"
        onSubmit={Login}
      >
        {/* Username */}
        <label className="flex flex-col">
          <h1 className="hover:underline pl-1 my-2 text-white">Username</h1>
          <input
            type="text"
            placeholder="Choose username (min 4)"
            className={`${inputStyle}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        {/* Password */}
        <div className="relative">
          <span
            onClick={() => setVisible((old) => !old)}
            className="material-symbols-outlined absolute top-[45px] right-1 p-1 select-none cursor-pointer"
          >
            {visible ? 'visibility' : 'visibility_off'}
          </span>
          <label className="flex flex-col">
            <h1 className="hover:underline pl-1 my-2 text-white">Password</h1>
            <input
              type={visible ? 'password' : 'text'}
              placeholder="Choose password"
              className={`${inputStyle}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button 
        className="p-2 transition-all mt-4 mb-8 sm:mb-0 active:text-[#7eaec9] bg-[#374a62]
         cursor-pointer hover:rounded-xl text-white rounded-lg hover:bg-[#455d7a]">
          Login</button>

  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center m-2 w-[280px] h-3
                  sm:static sm:text-left sm:mt-2 sm:left-auto sm:translate-x-12 mb-3">
    {warningDisplay && (
      <div className="text-center text-red-500 text-shadow-xs text-shadow-gray-700">
        {username === '' || password === '' ? (
          <h1>Please enter your login information</h1>
        ) : (
          <h1>Invalid username and/or password</h1>
        )}
      </div>)}
    </div>
      </form>

    </div>
  </div>
  <div className="bg-[#7eadc9af] rounded-b-xl pb-1">
  <h1 className="text-center font-[iconic] text-[#455d7aee] font-bold">Welcome back.</h1>
  <h1 className="text-center mt-5">Dont have an account yet? 
  <span className=" text-[#455d7aee] cursor-pointer hover:underline" onClick={(()=> navigate('/register'))}> Register</span></h1>
  </div>
</main>
    </main>
  );
}

export default LoginPage