import { useState, useContext } from "react";
import { API_BASE } from "../api";
import { useNavigate } from "react-router";
import { UserContext } from "../userContext";


function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {userInfo ,setUserInfo} = useContext(UserContext)
  const inputStyle = 'text-center w-[200px] border rounded-lg cursor-pointer active:bg-gray-200' 

  const Register = async () => {
    try{
    const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    })

    const data = await response.json()

    if (response.ok){
      setUserInfo(data)
      console.log("Registered", data);
      // navigate('/profile')
    }else{
      console.error('Registration failed:', data.error)
    }
    
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
            <h1 className="text-center text-2xl font-bold">Register</h1>
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
             >Register</button>

             <span className="mt-2 text-sm opacity-50">Allready have an account? 
                <span className="cursor-pointer underline text-[#455d7a] hover:text-[#374a62]"
                 onClick={(()=> navigate('/login'))} > Login</span></span>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegisterPage
