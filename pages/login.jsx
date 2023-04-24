import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function login() {
    // storing form data in state   
    const [formData, setFormData] = useState({ email: '', password: '' })

    // handling form data and sending it to backend
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/auth/login_user', formData)
                .then((response) => {
                    Cookies.set('token', response.data.token, { expires: 30 });
                    const userData = response.data.user;
                    const { email, name  , isAdmin , _id} = userData;
                    const dataX = { email, name  , isAdmin , _id}
                    localStorage.setItem('user', JSON.stringify(dataX))
                    if(userData.isAdmin === true)
                    {
                        Router.push('/admin/dashboard')
                    }
                    else
                    {
                        Router.push('/frontend/landing')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    return toast.error(error.response.data.error);
                });
        }
        catch (err) {
            console.log("error in login frontend catch block =>  " + err);
        }
    }

    return (

        <>
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login</div>
          <form onSubmit={handleSubmit} encType="application/json" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900 dark:text-gray-400"
                >
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                  ></input>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 dark:text-gray-400"
                  >
                    {' '}
                    Password{' '}
                  </label>

                  
                </div>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                  ></input>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                >
                  Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-2 h-4 w-4"
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
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <a
              href="/register"
              title=""
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
            >
              Create a free account
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
        </>
    )
}
