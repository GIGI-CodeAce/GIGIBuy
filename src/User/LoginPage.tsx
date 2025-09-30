import { useState } from "react";
import { API_BASE } from "../api";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const inputStyle = 'text-center border rounded-lg cursor-pointer active:bg-gray-200' 

  const Register = async () => {
    try{
    const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    })

    const data = await response.json()
    console.log("Registered", data);
    
    }catch(err){
      console.error("Error refistering", err)
    }
    setPassword('')
    setUsername('')
  }

  return (
    <>
      <main className="flex flex-col items-center mt-10 mb-20">

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
      </main>
    </>
  );
}

export default LoginPage
