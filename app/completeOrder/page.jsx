'use client'
import React, { useState } from 'react'
import{ Navbar, Footer } from '@/app/components'
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from '../store/Slices/cartSlice';
import { useRouter } from 'next/navigation';

export default async function OrderComplete() {
    const cartItem = useSelector((state) => state?.cartData)
    const [formState,setFormState] = useState({firstName:undefined,lastName:undefined,email:undefined,phone:undefined})
    const dispatch = useDispatch()
    const router = useRouter()

    const completeOrder = () =>{
      
      const getUser = localStorage.getItem('user');

      if(getUser){
          const user = JSON.parse(getUser);
          console.log(user)
          dispatch(clearCart({userId:user._id}))
          router.push('/orderPlaced')
      }
    }

    return (

    <section>
    <Navbar pos={""} />
  <h1 className="sr-only">Checkout</h1>

  <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
    <div className="bg-gray-50 py-12 md:py-24">
      <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="h-5 w-5 rounded-full bg-blue-700"></span>

          <h1 className="font-medium text-gray-900">Total cart value</h1>
        </div>

        <div>
          <p className="text-2xl font-medium tracking-tight text-gray-900">
            ${cartItem&& cartItem?.totalPrice && cartItem?.totalPrice + 5 + 8.32}
          </p>

          <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
        </div>

        <div>
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-100">
            {cartItem?.cart && cartItem?.cart?.map((val,index) =>
               <li key={index} className="flex items-center gap-4 py-4">
                {console.log(val)}
               <img
                 src={val.productImage}
                 alt=""
                 className="h-16 w-16 rounded object-cover"
               />

               <div>
                 <h3 className="text-sm text-gray-900">{val.productName}</h3>

                 <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                   <div>
                     <dt className="inline">Qty:</dt>
                     <dd className="inline">{val.productQuantity}</dd>
                   </div>

                   <div>
                     <dt className="inline">Price per item: </dt>
                     <dd className="inline">{val.productPrice}</dd>
                   </div>
                 </dl>
               </div>
             </li>

            )}
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-lg px-4 lg:px-8">
        <form className="grid grid-cols-6 gap-4">
          <div className="col-span-3">
            <label
              htmlFor="FirstName"
              className="block text-xs font-medium text-gray-700"
            >
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              className="mt-1 w-full h-12 rounded-md border-width-1 border-black-600 shadow-sm sm:text-sm text-black px-2"
            />
          </div>

          <div className="col-span-3">
            <label
              htmlFor="LastName"
              className="block text-xs font-medium text-gray-700"
            >
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              className="mt-1 w-full h-12 rounded-md border-gray-200 shadow-sm sm:text-sm text-black px-2"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Email" className="block text-xs font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              id="Email"
              className="mt-1 w-full h-12 rounded-md border-gray-200 shadow-sm sm:text-sm text-black px-2"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
              Phone
            </label>

            <input
              type="tel"
              id="Phone"
              className="mt-1 w-full h-12 rounded-md border-gray-200 shadow-sm sm:text-sm text-black px-2"
            />
          </div>

          <fieldset className="col-span-6">
            <legend className="block text-sm font-medium text-gray-700">
              Payment method
            </legend>

            <div className="flex mt-1 -space-y-px rounded-md bg-white shadow-sm">
              <div>
                <h2 className='text-black'>Cash on delivery</h2>
                <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6 text-green-600"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
              </div>
            </div>
          </fieldset>
          <div className="col-span-6">
            <button
              type="button"
              disabled={formState}
              className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
              onClick={() =>completeOrder()}
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
    
  </div>
</section>   
    )
}
