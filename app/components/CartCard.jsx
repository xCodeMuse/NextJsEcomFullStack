'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeFromCart,updateCart } from '../store/Slices/cartSlice';
import { useDispatch,useSelector } from 'react-redux';

export default function CartCard({ item, userID }) {

    const [Curquantity, setCurQuantity] = useState(item?.productQuantity);
    
    const dispatch = useDispatch()

    const delete_cart = async () => {
        const data = {productID:item.productID, userId:userID}
        dispatch(removeFromCart(data))
    }
    useEffect(() =>{
        setCurQuantity(item?.productQuantity)
    },[item])
    // const updateQuantity = async () => {
    //     const data = {productID:item.productID, userId:userID}
    //     dispatch(removeFromCart(data))
    // }

    const handleAdd = () => {
        const data = {productID:item.productID, user:userID, quantity:item.productQuantity + 1 }
        dispatch(updateCart(data))
    }

    const handleSubtract = () => {
        
        if(item.productQuantity === 1){
            const data = {productID:item.productID, userId:userID}
            dispatch(removeFromCart(data))
        }else{
            const data = {productID:item.productID, user:userID, quantity:item.productQuantity - 1 }
            dispatch(updateCart(data))
        }
    }


    return (
        <>
            <li key={item._id} className="flex py-6 sm:py-10">
              <div className="flex-shrink-0">
                <img
                  src={item.productImage}
                  alt="product"
                  className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm">
                        <a href={"#"} className="font-medium text-gray-700 hover:text-gray-800">
                        {item.productName}
                        </a>
                      </h3>
                    </div>
                    
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.productPrice}</p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:pr-9">
                    <label htmlFor={`quantity-${item._id}`} className="sr-only">
                      Quantity, {item.productName}
                    </label>
                    <button onClick={handleAdd} className='text-2xl  text-center font-semibold  outline-none hover:scale-125 w-10 h-10  flex items-center justify-center text-black'>+</button>
                     <p className=' text-gray-100 scale-110 font-semibold w-10 h-10 flex items-center justify-center text-2xl text-indigo-400'>{Curquantity}</p>
                    <button onClick={handleSubtract} className='text-2xl  text-center font-semibold  outline-none hover:scale-125 w-10 h-10  flex items-center justify-center text-black'>-</button>
           

                    <div className="absolute right-0 top-0 flex">
                      <button type="button" className="-m-2 inline-flex p-2 text-black hover:text-red-500" onClick={delete_cart}>
                        <span className="sr-only">Remove</span>
                        <AiOutlineDelete className="h-4 w-6 font-semibold text-4xl  cursor-pointer hover:text-red-500" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                  {product.inStock ? (
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                  ) : (
                    <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                  )}

                  <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
                </p> */}
              </div>
            </li>
        {/* <div className='text-white w-full h-32  flex justify-around items-center bg-indigo-500 rounded-xl my-4'>
            <div className='w-40 h-full flex items-center justify-center '>
                {console.log(item)}
                <Image src={item.productImage} alt="pdtImage" height={54} width={56} className='object-fill'/>
            </div>
            <div className='w-40 h-full flex items-center justify-center '>
                <p className='text-xl font-semibold '>{item.productName}</p>
            </div>
            <div className='w-40 h-full flex items-center justify-center '>
                <p className='text-xl font-semibold '>$ {item.productPrice}</p>
            </div>
            <div className='w-40 h-full flex items-center justify-center '>
                <button onClick={handleAdd} className='text-2xl  text-center font-semibold  outline-none hover:scale-125 transition duration-500 w-10 h-10  flex items-center justify-center '>+</button>
                <p className=' text-gray-100 scale-110 font-semibold w-10 h-10 flex items-center justify-center text-2xl'>{Curquantity}</p>
                <button onClick={handleSubtract} className='text-2xl  text-center font-semibold  outline-none hover:scale-125 transition duration-500 w-10 h-10  flex items-center justify-center '>-</button>
            </div>
            <div className='w-40 h-full flex items-center justify-center '>
                <AiOutlineDelete onClick={delete_cart} className="font-semibold text-4xl  cursor-pointer hover:text-red-500" />
            </div>
          
        </div> */}
        </>
    )
}
