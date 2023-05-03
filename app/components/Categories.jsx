import React from 'react'
import CatCard from './CatCard'

export default function Categories({ category  }) {
    return (
        <div className='w-full flex flex-wrap items-center justify-center flex-col'>
            <h1 className='p-2 mb-6 mt-2 border-orange-600 text-4xl uppercase font-bold dark:text-black'>top Categories</h1>
            <div className='w-full h-full flex items-center justify-center flex-wrap dark:text-black'>

            {
                category?.map((item) => {
                    return ( <CatCard key={item._id} item={item}   />  )
                })
            }
            {!category && <><div className='w-96 h-52 bg-gray-200 border border-gray-200 rounded animate-pulse'/><div className='mx-4 w-96 h-52 bg-gray-200 border border-gray-200 rounded animate-pulse'/><div className='w-96 h-52 bg-gray-200 border border-gray-200 rounded animate-pulse'/></>}

            </div>
        </div >
    )
}
