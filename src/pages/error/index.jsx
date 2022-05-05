import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className='my-10 mx-auto px-auto align-center'>
        <div className='text-4xl'>OOP! PAGE NOT FOUND</div>
        <Link to={"/admin"} className="text-2xl text-none text-[blue]">Back Admin Page </Link>
    </div>
  )
}
