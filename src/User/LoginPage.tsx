import { useState,useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { API_BASE } from "../api";

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(true)
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
      })
    setUsername('')
    setPassword('')
    }

  }

  return (
    <>

    <main className="max-w-screen-lg mx-auto p-2">
  <div className="flex items-center bg-[#7eaec9] justify-between gap-10 p-4 mt-5 rounded-xl">

    <div className="w-2/5 text-center flex flex-col items-center justify-center">
            <img className="w-[100px]"
      src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//diamondFixed.png"/>
      <h1 className="font-bold text-3xl">Login</h1>
      <h1 className="font-bold text-lg">Use GIGIbuy account</h1>
    </div>

    <div className="w-3/5 flex-1 flex items-center justify-center">
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={Login}
      >
        {/* Username */}
        <label className="flex flex-col">
          <h1 className="hover:underline pl-1 mb-1">Username</h1>
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
            className="material-symbols-outlined absolute top-[34px] right-1 p-1 select-none cursor-pointer"
          >
            {visible ? 'visibility' : 'visibility_off'}
          </span>
          <label className="flex flex-col">
            <h1 className="hover:underline pl-1 mb-1">Password</h1>
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
        className="p-2 bg-black transition-all active:text-green-300 cursor-pointer hover:rounded-xl text-white rounded-lg hover:bg-gray-800">
          Register  </button>
      </form>
    </div>
  </div>

          {warningDisplay && (
      <div className="text-center text-red-600 m-2">
        {username === '' && password === '' ? (
          <h1>Please enter your login information</h1>
        ) : (
          <h1>Invalid username and/or password</h1>
        )}
      </div>
)}
</main>
    </>
  );
}

export default LoginPage


      {/* <main className="flex flex-col items-center mt-10 mb-20">

        <div className="relative">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <input 
            value={username}
            onChange={((e)=> setUsername(e.target.value))}
            className={`${inputStyle}`} 
            placeholder="Username"

            />
            <input value={password}
            onChange={((e)=> setPassword(e.target.value))}
            className={`${inputStyle}`} 
            placeholder="password"
            />

            <button
             className={`${inputStyle}`}
             onClick={Register}
             >Login</button>
          </div>
        </div>
      </main> */}