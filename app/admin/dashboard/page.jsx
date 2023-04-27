"use client"
import React from 'react'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar_com from '../components/Sidebar_com';
import Profile from '../components/Profile';
import { useRouter } from 'next/navigation';

export default function dashboard() {
  const router = useRouter()
  // storing token in variable token 
  const token = Cookies.get('token');

  // if token is not present then redirect to login page
  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
    else {
      const user = localStorage.getItem('user');
      const data = JSON.parse(user);
      if (data.isAdmin === false) {
        toast.error('You are not allowed to access this page');
        router.push('/');
      }
    }
    

  }, [])

  return (
    <div className='w-full h-screen bg-slate-900 flex'>
      <Sidebar_com />
      <Profile />
      <ToastContainer />
    </div>
  )
}
