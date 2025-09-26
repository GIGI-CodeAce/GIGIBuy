import { useState } from "react";

function UserProfile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const inputStyle = 'text-center border rounded-lg cursor-pointer active:bg-gray-200' 

  return (
    <>
      <main className="flex flex-col items-center mt-10 mb-20">
        {/* Profile Picture */}
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
             onClick={(()=> console.log(username,password))}
             >Register</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserProfile;
