"use client"
import React, { useEffect, useState } from 'react'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import "react-tooltip/dist/react-tooltip.css";
import Cookies from 'js-cookie'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Navbar({pos}) {
    const token = Cookies.get('token');
    const [curUser, setCurUser] = useState(false);
    const [scrolled , isScrolled]  = useState(false);
    const cartQuantity = useSelector((state) => state.cartData.totalQuantity)
    const router = useRouter()
    useEffect(() => {
        if (token) {
            setCurUser(true)
        }
    }, [token])


    const logout = () => {
        Cookies.remove('token')
        localStorage.removeItem('user')
        localStorage.clear;
        window.location.reload();
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                isScrolled(true)
            } else {
                isScrolled(false)
            }
        })
        return () => {
            window.removeEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    isScrolled(true)
                } else {
                    isScrolled(false)
                }
            })
        }
    }, [scrolled])



    return (
       <> <div className={` ${scrolled ? "bg-slate-900" : "transparent"} z-50  w-full h-24  text-white flex justify-around ${pos} top-0 left-0`}>
            <a
          className="text-3xl font-bold leading-none flex items-center space-x-4"
          href="/"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4F46E5"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
            </svg>
          </span>
          <span className={`text-gray-600 ${scrolled ? "dark:text-white" : "dark:text-black-300"} text-xl`}>
            FlopCart
          </span>
        </a>
            <div className=' h-full flex item-center  justify-center px-4'>
                <ul className='w-full h-full flex items-center justify-center'>
                    <li onClick={() => router.push('/')} className={`mx-4 p-2 text-lg cursor-pointer transition-all duration-500 hover:text-orange-600 ${!scrolled && "dark:text-black"}`}>Home</li>
                    <li onClick={() => router.push('/productList')} className={`mx-4 p-2 text-lg cursor-pointer transition-all duration-500 hover:text-orange-600 ${!scrolled && "dark:text-black"}`}>Products</li>
                    <li className={`mx-4 p-2 text-lg cursor-pointer transition-all duration-500 hover:text-orange-600 ${!scrolled && "dark:text-black"}`}>About</li>
                    <li className={`mx-4 p-2 text-lg cursor-pointer transition-all duration-500 hover:text-orange-600 ${!scrolled && "dark:text-black"}`}>Contact</li>
                     </ul>
            </div>
            <div className=' h-full  flex items-center  justify-around px-4'>
            <span className={`dark:text-black mr-2 pt-1 ${scrolled && "dark:text-white"}`}>{curUser && cartQuantity}{console.log(cartQuantity)}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className={`ltr:mr-3 rtl:ml-3 h-5 w-5 transition-all duration-500 cursor-pointer ${!scrolled ? "text-black":"text-white"}`} onClick={()  => router.push('/cart')} >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
              </svg>
                
              {
                    curUser ? <BiLogOut id="logout" className={`text-2xl  mx-4  hover:text-orange-600 transition-all duration-500 cursor-pointer ${!scrolled ? "text-black":"text-white"}`} onClick={logout} /> : <Link href={`/login`}> <BiLogIn id="login" className={`text-2xl  mx-4  hover:text-orange-600 transition-all duration-500 cursor-pointer ${!scrolled ? "text-black":"text-white"}`} onClick={() => {router.push('/login')}}  /></Link>
                }

            </div>
          
        </div>

        

 </>
    )
}
