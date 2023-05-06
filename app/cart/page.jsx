"use client"
import React, { useEffect, useState } from 'react'
import{ Navbar, Footer, CartCard } from '@/app/components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCartById} from '../store/Slices/cartSlice';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const cartItem = useSelector((state) => state.cartData)
    const [userID, setUserID] = useState(undefined);
    const dispatch = useDispatch()
    const router = useRouter()
    const getLatestCartData = async () => {
        const getUser = localStorage.getItem('user');

        if(getUser){
            const user = JSON.parse(getUser);
            setUserID(user?._id);
            dispatch(fetchCartById(user?._id));
        }
        
    }

    useEffect(() => {
        getLatestCartData();
    }, [])


    return (
     
    <div className="bg-white">
    <Navbar pos={""} />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <h4 id="cart-heading text-black" className="sr-only">Please login to items to cart</h4>
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cartItem?.cart?.map((item, productIdx) => (
                <CartCard item={item} key={item._id} index={productIdx} userID={userID} reupdate={getLatestCartData} />
              ))}
               
            </ul>
           
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${cartItem?.totalPrice}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    ?
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{cartItem?.totalQuantity > 0 && "$5.00"}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    ?
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{cartItem?.totalQuantity > 0 && "$8.32"}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${cartItem?.totalQuantity > 0 ? cartItem?.totalPrice + 5 + 8.32:0}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => router.push('/completeOrder')}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
      <Footer />
            <ToastContainer />
    </div>
   
    )
}
