import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { add_to_cart } from '@/app/services';
import Link from 'next/link';


export default function ProdCard({ item }) {
    const token = Cookies.get('token');
    const [userID, setUserID] = useState(undefined)

    useEffect(() => {
        if (token) {
            const getUser = localStorage.getItem('user')
            const user = JSON.parse(getUser);
            setUserID(user._id)
        }
    }, [])

    const AddtoCart = async () => {
        console.log("adding item to cart",token,userID)
        if (!token) {
            toast.error('Please login ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (userID) {
            const { _id, name, image, price } = item;
            const data = { productID: _id, productName: name, productImage: image, productPrice: price, user: userID , productQuantity: 1}   
        }

    }

    return (
       
    <Link class="m-2 rounded-xl w-72 h-80 bg-white p-4 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 " href={`/product/${item?._id}`}>
      
        <div class="w-full h-4/6 relative flex flex-row items-end overflow-hidden rounded-xl">
          <img src={item.image} alt="Hotel Photo" className='w-full h-full object-fill' />
          {
                item.featured && <p className='bg-gray-900 py-1  absolute flex items-center justify-center text-white text-center  text-sm  top-2  left-3 rounded-xl px-4'>Featured</p>
            }
        </div>

        <div class="mt-1 p-2">
          <h2 class="text-slate-700">{item.name}</h2>
          <div class="mt-3 flex items-end justify-between">
              <p class="text-lg font-bold text-indigo-500">$ {item.price}</p>
            <div class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              <button class="text-sm" onClick={AddtoCart}>Add to cart</button>
            </div>
          </div>
        </div>
    
    </Link>
    )
}
