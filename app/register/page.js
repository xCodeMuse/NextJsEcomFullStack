"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function register() {
    // storing form data in state
    const [formData, setFormData] = useState({ name: "", email: "", password: "", cPassword: "" });

    // storing errors in state
    const [Confirm_errors, setConfirm_Errors] = useState(false);
    const [length_errors, setLength_Errors] = useState(false);

    // destructuring form data
    const { name, email, password, cPassword } = formData;

    // handling form data sending it to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setLength_Errors(true)
        }
        if (password !== cPassword) {
            setConfirm_Errors(true);
        }
        const finalData = { name, email, password }
        try {
            const res = await axios.post('/api/auth/register_user', finalData)
            toast.success(res.data.message)
        } catch (error) {
            console.log(error.response.data.error)
            toast.error(error.response.data.error)
        }
    }

    return (
        <>
   
      <div className="my-10 flex items-center justify-center">
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
          <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-10 lg:py-12">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign Up</h2>
              <p className="mt-2 text-base text-gray-600 tracking-wide">
                Already have an account?{' '}
                <a
                  href="/login"
                  title=""
                  className="font-medium tracking-wide text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                >
                  Sign In
                </a>
              </p>

              <form onSubmit={handleSubmit} encType="application/json" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-900 tracking-wide">
                      {' '}
                      Full Name{' '}
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        placeholder="Enter You Full Name"
                        id="name"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-base font-medium text-gray-900 tracking-wide">
                      {' '}
                      Email address{' '}
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="email"
                        placeholder="Enter Your Email"
                        id="email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        value={formData.email}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="text-base font-medium text-gray-900 tracking-wide">
                      {' '}
                      Password{' '}
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="password"
                        placeholder="Enter Your Password"
                        id="password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        value={formData.password}
                      ></input>
                      {
                                        length_errors && <p className="text-red-500 text-xs italic">Please choose a password of at least 8 chars.</p>
                                    }
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-password" className="text-base font-medium text-gray-900 tracking-wide">
                      {' '}
                      Confirm Password{' '}
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="password"
                        placeholder="Confirm Your Password"
                        id="c-password"
                        onChange={(e) => setFormData({ ...formData, cPassword: e.target.value })}
                        value={formData.cPassword}
                      ></input>
                      {
                                        Confirm_errors && <p className="text-red-500 text-xs italic">Passwords do not match.</p>
                                    }
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="tracking-wide inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    >
                      Register
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-2 h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </button>
                
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
   
    <ToastContainer />
        </>
    )
}
