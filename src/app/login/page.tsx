"use client"
const page = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='lg:w-1/3 w-[90%] h-[80%] shadow-md flex-row px-5 py-5'>
        <div className="flex justify-center h-40 w-full'">
          <img src="/logo.png" className="w-45" alt="" />
        </div>

        <div className="mt-12 flex-row px-10 relative bottom-20">
          <label htmlFor="email" className="font-bold text-purple-800 text-lg">Email</label>
          <input type="email" name="email" placeholder="Enter your email" className="w-full px-5 border border-gray-300 h-10 rounded-2xl shadow-sm mt-2 mb-2" />
          <label htmlFor="pass" className="font-bold text-purple-800 text-lg">Password</label>
          <input type="password" name="pass" placeholder="Enter your password" className="w-full mb-2 border px-5 h-10 rounded-2xl border-gray-300 shadow-sm mt-2" />
          <button>Dont have an account? <span>Register</span></button>
        </div>

        <div className="w-full flex justify-center px-10 relative bottom-10">
          <button className="text-white bg-purple-800 p-2 w-full rounded-2xl">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default page