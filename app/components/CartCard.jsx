'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeFromCart,updateCart } from '../store/Slices/cartSlice';
import { useDispatch,useSelector } from 'react-redux';

export default function CartCard({ item, userID, reupdate }) {

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
        <div className='text-white w-full h-32  flex justify-around items-center bg-indigo-500 rounded-xl my-4'>
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
          
        </div>
    )
}
