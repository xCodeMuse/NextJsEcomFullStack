import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { add_to_cart } from '@/services/admin';



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
        <div className='cursor-pointer w-72 h-80 my-4 mx-4 rounded-2xl shadow-xl transition-all duration-700 hover:scale-110 relative '>
            <div className='w-full h-4/6 bg-gray-400 rounded-2xl ' >
                <img src={item.image} alt="no image" className='w-full h-full object-fill' />
            </div>
            {
                item.featured && <p className='bg-slate-900 py-1  absolute flex items-center justify-center text-white text-center  text-sm  top-2  left-3 rounded-2xl px-4'>Featured</p>
            }

            <div className='w-full h-2/6  p-2'>
                <p className='text-lg font-bold px-2 py-1 uppercase tracking-wider'>{item.name}</p>
                <div className='flex w-full justify-between items-center'>
                    <p className='text-lg font-bold px-2 py-1'>$ {item.price}</p>
                    
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="ltr:mr-3 rtl:ml-3 h-5 w-5 text-orange-600" onClick={AddtoCart}>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
              </svg>
                </div>
            </div>
        </div>
    )
}
