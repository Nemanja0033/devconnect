"use client"
import { useState } from "react"
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [isHaveAccaount, setIsHaveAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    const response = await fetch('/api/login', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    if (response.ok) {
        await signIn("credentials", { email, password, callbackUrl: '/'})
    } else {
      setError(true);
    }
};

const handleRegister = async () => {
  const response = await fetch('/api/register', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password
    })
  });
  if(response.ok){
    location.href = '/login';
  }
  else{
    setError(true);
  }
}


  if(isHaveAccaount){
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='lg:w-1/3 w-[90%] h-[80%] shadow-md flex-row px-5 py-5'>
          <div className="flex justify-center h-40 w-full'">
            <img src="/logo.png" className="w-45" alt="" />
          </div>
  
          <div className="mt-12 flex-row px-10 relative bottom-20 text-purple-950">
            <label htmlFor="email" className="font-bold text-lg">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter your email" className="w-full px-5 border border-gray-300 h-10 rounded-2xl shadow-sm mt-2 mb-2" />
            {error ? <p className="text-red-500 text-sm">Invalid Email or Password!</p> : null}
            <label htmlFor="pass" className="font-bold text-lg">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="pass" placeholder="Enter your password" className="w-full mb-2 border px-5 h-10 rounded-2xl border-gray-300 shadow-sm mt-2" />
            <p className="text-gray-500">Dont have an account? <span onClick={() => setIsHaveAccount(!isHaveAccaount)} className="text-purple-900 cursor-pointer underline">Register</span></p>
          </div>
  
          <div className="w-full flex justify-center px-10 relative lg:bottom-15 bottom-15">
            <button onClick={handleLogin} className="text-white bg-purple-950 p-2 w-full rounded-2xl cursor-pointer hover:bg-purple-900 transition-all">Submit</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-auto flex justify-center items-center'>
      <div className='lg:w-1/3 w-[90%] h-[80%] shadow-md flex-row px-5 py-5'>
        <div className="flex justify-center h-40 w-full'">
          <img src="/logo.png" className="w-45" alt="" />
        </div>

        <div className="mt-12 flex-row px-10 relative bottom-20 text-purple-950">
          <label htmlFor="username" className="font-bold text-lg">Username</label>
          <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Enter your email" className="w-full px-5 border border-gray-300 h-10 rounded-2xl shadow-sm mt-2 mb-2" />
          <label htmlFor="email" className="font-bold text-lg">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter your email" className="w-full px-5 border border-gray-300 h-10 rounded-2xl shadow-sm mt-2 mb-2" />
          {error ? <p className="text-red-500">Invalid Email or Password!</p> : null}
          <label htmlFor="pass" className="font-bold text-lg">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="pass" placeholder="Enter your password" className="w-full mb-2 border px-5 h-10 rounded-2xl border-gray-300 shadow-sm mt-2" />
          <p className="text-gray-500">Arleady have account? <span onClick={() => setIsHaveAccount(!isHaveAccaount)} className="text-purple-900 cursor-pointer underline">Login</span></p>
        </div>

        <div className="w-full flex justify-center px-10 relative lg:bottom-10 bottom-15">
          <button onClick={handleRegister} className="text-white bg-purple-950 p-2 w-full rounded-2xl cursor-pointer hover:bg-purple-900 transition-all">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage