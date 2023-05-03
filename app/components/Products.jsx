import React from 'react'
import ProdCard from './ProdCard'

export default function Products({ product }) {
    return (
        <div className='w-full p-4 flex flex-wrap items-center justify-center flex-col'>
            <h1 className='p-2 mb-6 mt-2 border-orange-600 text-4xl uppercase  font-bold dark:text-black'>top Products</h1>
            <div className='w-full h-full flex items-center justify-center flex-wrap'>

                {/* card */}
                {
                    product?.map((item) => {
                        return (
                            <ProdCard item={item} key={item._id} />
                        )
                    })
                }
                {/* card */}
                {!product && <><div className='w-72 h-80 bg-gray-200 border border-gray-200 rounded animate-pulse'/><div className='w-72 h-80 mx-4 bg-gray-200 border border-gray-200 rounded animate-pulse'/><div className='w-72 h-80 bg-gray-200 border border-gray-200 rounded animate-pulse'/></> }

            </div>
        </div >
    )
}
