import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from "@services/http";

export default function ActivityPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async() => {
      try{
        const reqUsers = await axios.get(`${url}/users`);
        if(reqUsers?.data){
          setUsers(reqUsers?.data)
        }
        
        console.log(reqUsers.data)
      }catch{

      }
    })()
  }, [])
  // TODO CREATE PAGE
  return (
    <div className='w-[800px] mx-auto mb-[50px]'>
      <table className='w-full'>
        <thead>
          <tr className='border'>
            <th className='text-left border-2 border-[black]'>No.</th>
            <th className='text-left border-2 border-[black]'>Id</th>
            <th className='text-left border-2 border-[black]'>User name</th>
            <th className='text-left border-2 border-[black]'>Quiz</th>
            <th className='text-left border-2 border-[black]'>points</th>
          </tr>
        </thead>
        <tbody>
         {users.map((user,index) => {
           return  <tr key={index} className="border border-[#006f97]">
                        <td className='border border-1 border-[#111111]'>{index + 1}</td>
                        <td className='border border-1 border-[#111111]'>{user._id}</td>
                        <td className='border border-1 border-[#111111]'>{user.userName}</td>
                        <td className='border border-1 border-[#111111]'>{user.quiz}</td>
                        <td className='border border-1 border-[#111111]'>{user.points}</td>
                    </tr>
         })}
        </tbody>
      </table>
    </div>
  )
}
