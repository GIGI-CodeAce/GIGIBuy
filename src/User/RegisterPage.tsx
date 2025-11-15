import { useState, useEffect, type FormEvent, } from "react"
import { useNavigate } from "react-router"
import { API_BASE } from "../api"

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [visible, setVisible] = useState(true)
  const [ServerRunning, setServerRunning] = useState(false)
  const navigate = useNavigate()
  const inputStyle = 'p-2 border rounded-lg bg-gray-100 my-2'

  function ResetRegister() {
    setUsername('')
    setPassword('')
    setRepeatPassword('')
  }

  useEffect(() => {
    setWarningMessage('')
  }, [username, password])

 async function Register(e: FormEvent) {
  e.preventDefault();

  setWarningMessage('')
  setSuccessMessage('')

  // if(ServerRunning){
  if (!username || !password) {
    setWarningMessage('Please enter your register information');
    return
  }
  if(password.length < 4){
    setWarningMessage('Password is too short')
    return
  }
  if (password !== repeatPassword) {
    setWarningMessage('Passwords do not match.');
    return
  }
  // }

  try{
     const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (response.status !== 200) {
    const errorData = await response.json()
    console.log('Server response:', errorData);
    if (errorData?.error === 'Username allready exists') {
      setWarningMessage('Username already taken')
    } else {
        if(username.length > 15 || username.length <= 3){
    setWarningMessage("Username should over 4 char's long")
  }else{
    setWarningMessage('Registration failed. Please try again.')
  }
    }
  } else {
    setSuccessMessage('Account created. Go to login to sign in.')
    setTimeout(() => {
      ResetRegister()
    }, 3000)
  }
  }catch(error){
    setWarningMessage('Server not running or unreachable.')
    setServerRunning(true)
  }
}

  return (
    <main>
  <div className="inset-0 z-0 h-screen opacity-13 absolute w-full bg-[url('./assets/rotatediamond.png')] bg-[length:100px_100px] bg-repeat"></div>
<main className="relative z-10 max-w-screen-lg transition-all justify-center items-center mx-auto sm:px-2 pt-10">
  <div className="bg-[#7eadc9af] rounded-t-xl pb-1 h-5"></div>
  <div className="flex relative sm:static items-center bg-[#7eaec9] shadow-[#7eaec9] justify-between gap-10 px-4 py-2 pb-13 sm:pb-5">
    {/* Left side*/} 
    <div className="w-35/100 text-center flex flex-col items-center justify-center font-[iconic]">
            <img className="w-[100px]"
      src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//diamondFixed.png"/>
      <h1 className="font-bold underline text-2xl sm:text-3xl">Register</h1>
      <h1 className="font-bold sm:text-lg">Create an account</h1>
    </div>

    {/* Right side*/}
<div className="w-65/100 flex-1 flex items-center justify-center">
  <form
    className="flex flex-col w-full max-w-sm sm:relative static"
    onSubmit={Register}
  >
    {/* Username */}
    <label className="flex flex-col">
      <h1 className="hover:underline pl-1 mt-2 text-white">Username</h1>
      <input
        type="text"
        maxLength={15}
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
        className="material-symbols-outlined absolute top-[37px] right-1 p-1 select-none cursor-pointer"
      >
        {visible ? 'visibility' : 'visibility_off'}
      </span>
      <label className="flex flex-col">
        <h1 className="hover:underline pl-1 text-white">Password</h1>
        <input
          type={visible ? 'password' : 'text'}
          placeholder="Choose password"
          className={`${inputStyle}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </div>

    {/* Repeat password */}
    <input
      type="password"
      placeholder="Repeat password"
      className={`${inputStyle}`}
      value={repeatPassword}
      onChange={(e) => setRepeatPassword(e.target.value)}
    />

    {/* Submit */}
    <button className="p-2 mt-2 transition-all active:text-[#7eaec9]
    cursor-pointer hover:rounded-xl text-white rounded-lg hover:bg-[#455d7a] bg-[#374a62]">
      Register
    </button>

    {/* Message */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center m-2 w-[280px] h-3
                  sm:static sm:text-left sm:mt-2 sm:left-auto sm:translate-x-12 mb-3">
    {warningMessage && 
      <p className="text-red-500 text-center
       text-shadow-xs text-shadow-gray-700">{warningMessage}</p>}
    {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
  </div>
  </form>
</div>

  </div>

  {/* Messages */}
  <div className="bg-[#7eadc9af] rounded-b-xl pb-2">
  <h1 className="text-center font-[iconic] text-[#455d7aee] font-bold">Fashion Forward, Always You</h1>
  <h1 className="text-center mt-5">Allready have an account? 
  <span className="text-[#455d7aee] cursor-pointer hover:underline" onClick={(()=> navigate('/login'))}> Log in</span></h1>
  </div>

</main>
    </main>
  );
}

export default RegisterPage
