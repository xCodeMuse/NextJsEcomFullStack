"use client"
import React, { useEffect, useState } from 'react'


export default function Profile() {
    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)



    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        setName(data?.name)
        setEmail(data?.email)
    }, [])


    return (
        <div className='w-10/12 h-full text-white px-4 flex items-center justify-start flex-col'>
            <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                <h1 className='text-4xl font-semibold tracking-widest p-2 uppercase'>WELCOME</h1>
            </div>
            <div className='container w-8/12  p-4 '>
                    <div className=' flex px-2 items-center justify-center w-full h-full '>


                        <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                           
                            <div className="mt-0 w-fit mx-auto">
                                <img src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" className="rounded-full w-28 " alt="profile picture" />
                            </div>

                            <div className="mt-8 ">
                                <h2 className="text-white text-center font-bold text-2xl tracking-wide">{name} </h2>
                            </div>
                            <p className="text-emerald-400 text-center font-semibold mt-2.5" >
                                Active
                            </p>

                        </section>



                    </div>
                
            </div>
        </div>
    )
}
