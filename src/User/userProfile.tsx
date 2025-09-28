import { useState } from "react";
import { API_BASE } from "../api";

function UserProfile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

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
  }

  return (
    <>
      <main className="text-center">
        User profile
      </main>
    </>
  );
}

export default UserProfile;
