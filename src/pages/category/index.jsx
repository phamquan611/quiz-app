import React from 'react'

export default function CategoryPage(props) {
    const {categories} = props;
  return (
    <div>
        <div className='flex flex-wrap'>
            {categories.map((category) => {
                return (
                    <div className='w-1/4 px-4 pb-5 mb-5'>
                        <img src="https://play-lh.googleusercontent.com/IFW4S2aa_xgrrj26y4eww8bU99HNmjJeWC2Dx60nBjrww88Zvw9aI3hnN2IDXvUdiPg=s180-rw" 
                        alt="category" 
                        className='w-full h-[200px] cursor-pointer'
                        />
                        <div className='cursor-pointer text-center font-bold mt-2'>
                            {category.category}
                        </div>
                        <div className='cursor-pointer'>
                            Description in Topic
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
