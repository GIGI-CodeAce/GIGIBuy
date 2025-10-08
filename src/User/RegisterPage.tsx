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
  const navigate = useNavigate()
  const inputStyle = 'p-2 border rounded-lg bg-gray-100 my-2'

  function ResetRegister() {
    setUsername('')
    setPassword('')
    setRepeatPassword('')
  }

  useEffect(() => {
    setWarningMessage('')
    // setSuccessMessage('')
  }, [username, password])

 async function Register(e: FormEvent) {
  e.preventDefault();

  setWarningMessage('')
  setSuccessMessage('')


  if (!username || !password) {
    setWarningMessage('Please enter your register information');
    return
  }

  if (password !== repeatPassword) {
    setWarningMessage('Passwords do not match.');
    return
  }

  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (response.status !== 200) {
    const errorData = await response.json()
    if (errorData?.error === 'Username already exists') {
      setWarningMessage('Username already taken')
    } else {
        if(username.length > 15 || username.length <= 3){
    setWarningMessage('Username should be over 4 and less than 15 characters long')
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
}

  return (
<main className="max-w-screen-lg transition-all justify-center items-center mx-auto sm:px-2 mt-10">
  <div className="flex relative sm:static items-center bg-[#7eaec9] justify-between gap-10 p-4 mt-5 pb-10 sm:pb-5 rounded-t-xl">
    {/* Left side*/} 
    <div className="w-35/100 text-center flex flex-col items-center justify-center font-[iconic]">
            <img className="w-[100px]"
      src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//diamondFixed.png"/>
      <h1 className="font-bold text-3xl">Register</h1>
      <h1 className="font-bold text-lg">Use GIGIbuy account</h1>
    </div>

    {/* Right side*/}
<div className="w-65/100 flex-1 flex items-center justify-center">
  <form
    className="flex flex-col w-full max-w-sm sm:relative static"
    onSubmit={Register}
  >
    {/* Username */}
    <label className="flex flex-col">
      <h1 className="hover:underline pl-1">Username</h1>
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
        className="material-symbols-outlined absolute top-[37px] right-1 p-1 select-none cursor-pointer"
      >
        {visible ? 'visibility' : 'visibility_off'}
      </span>
      <label className="flex flex-col">
        <h1 className="hover:underline pl-1">Password</h1>
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
    <button className="p-2 mt-2 transition-all active:text-green-300 
    cursor-pointer hover:rounded-xl text-white rounded-lg hover:bg-gray-800 bg-[#374a62]">
      Register
    </button>

    {/* Message */}
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center m-2 w-[280px] h-3
                  sm:static sm:text-left sm:mt-2 sm:left-auto sm:translate-x-12">
    {warningMessage && <p className="text-red-500 text-center">{warningMessage}</p>}
    {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
  </div>
  </form>
</div>

  </div>

  {/* Messages */}
  <div className="bg-[#7eadc999] rounded-b-xl pb-1">
  <h1 className="text-center font-[iconic] text-[#455d7aee] font-bold">Fashion Forward, Always You</h1>
  <h1 className="text-center mt-5">Allready have an account? 
  <span className="text-[#455d7aee] cursor-pointer hover:underline" onClick={(()=> navigate('/login'))}> Log in</span></h1>
  </div>

</main>


  );
}

export default RegisterPage
