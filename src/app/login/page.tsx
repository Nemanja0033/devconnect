"use client"
const page = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='lg:w-1/3 w-[90%] h-[80%] shadow-md flex-row px-5 py-5'>
        <div className="flex justify-center w-full'">
          <img src="/logo.png" className="w-32" alt="" />
        </div>
        <div className="mt-12 flex-row">
          <label htmlFor="email" className="font-bold text-purple-800 text-lg">Email</label>
          <input type="email" name="email" className="w-full border border-gray-300 shadow-sm mt-2" />
        </div>
      </div>
    </div>
  )
}

export default page