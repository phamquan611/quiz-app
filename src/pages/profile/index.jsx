import React from 'react';
import withAdmin from "@middleware/withAdmin"

function ProfilePage() {
  return (
    <>
        <div className='w-full p-4 mb-20 bg-[]'>
            <div className="w-[800px] mx-auto " >
                <div className='flex jus-between bg-[#f1f1f1] p-4 mb-10'>
                    <div className='w-1/4'>
                        <div className='mb-8 text-2xl font-bold'>
                            Avatar
                        </div>
                        <img 
                        src="https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png" 
                        alt="avatar" 
                        className='w-[200px]'
                        />
                    </div>
                    <div className='w-3/4 pl-4'>
                        <div className='mb-10 text-[16px] font-bold'>
                            Use URL to make a Avatar
                        </div>
                        <input 
                        type="text" 
                        name="img_url"
                        className='border border border-slate-500 w-full w-full py-2 px-4'  
                        />
                        <div className='mt-6'>
                            <button className='py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-sm hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75'>
                                Change URL
                            </button>
                        </div>
                    </div>
                </div>
                <div className='bg-[#f1f1f1] p-4 '>
                    <div className='font-bold text-2xl'>Account</div>
                    <div className='mt-5'>
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Account
                        </span>
                        <input type="text" name="account"  value={"admin@smartosc.com"} 
                            className="px-3 py-2 bg-white border shadow-sm w-3/4 mt-2 rounded-sm"
                        />
                    </div>
                    <div className='mt-8'>
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Old password
                        </span>
                        <input type="password" name="oldPass"  value={""} 
                            className="px-3 py-2 bg-white border shadow-sm w-3/4 mt-2 rounded-sm"
                        />
                    </div>
                    <div className='mt-8'>
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        New password 
                        </span>
                        <input type="password" name="newPass"  value={""} 
                            className="px-3 py-2 bg-white border shadow-sm w-3/4 mt-2 rounded-sm"
                        />
                    </div>
                    <div className='mt-8'>
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Retype password
                        </span>
                        <input type="password" name="retypePass"  value={""} 
                            className="px-3 py-2 bg-white border shadow-sm w-3/4 mt-2 rounded-sm"
                        />
                    </div>
                    <div className='mt-8'>
                        <button className='py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-sm hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75'>
                            Change password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default withAdmin(ProfilePage);