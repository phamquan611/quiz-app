import React, { useState } from 'react';

export default function SignInPage() {
  const [input, setInput] = useState({account : "", password : ""});
  const {account, password} = input;
  const handleChangeInput = (e) => {
    return setInput({...input, [e.target.name] : e.target.value })
  }
  return (
    <>
      <div className='flex-auto'>
        <div className='mt-20 ml-5 text-3xl font-bold text-[#50d71e] cursor-pointer w-[180px]'>PQ Quizz!!!</div>
      </div>
      <div className='w-full h-full mt-20'>
        <div className='mx-auto text-center font-bold text-2xl'>Sign in with <b className='text-[#50d71e]'>PQ Quizz!!!</b></div>
        <div className='lg:w-1/3 md:w-2/3 sm:w-full max-w-full mx-auto mb-5 mt-10 px-4'>
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Account
          </span>
          <input 
            type="text" 
            name="account"
            onChange={handleChangeInput}
            value={account}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            placeholder="Admin account" 
          />
        </label>
        </div>
        <div className='lg:w-1/3 md:w-2/3 sm:w-full max-w-full mx-auto px-4'>
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              password
            </span>
            <input 
              type="password" 
              name="password" 
              value={password}
              onChange={handleChangeInput}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="password" 
            />
          </label>
        </div>
        <div className='text-center mt-10'>
          <button className='py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75'>
            Sign In
          </button>
        </div>
      </div>
    </>
  )
}
