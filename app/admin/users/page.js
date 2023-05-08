import { getUserData } from '@/app/services'
import React,{Suspense} from 'react'
import Sidebar_com from '../components/Sidebar_com'

export default async function User() {
    const data = await getUserData();

    await Promise.all([data])
    return (
        <div className='w-full h-screen bg-slate-900 flex'>
          {console.log(data)}
            <Sidebar_com />
            <div className='w-10/12 h-full text-white'>
                <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                    <h1 className='text-4xl font-semibold tracking-widest p-2 uppercase'>User List</h1>
                </div>
                <div className="flex flex-col mt-6 px-10">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div
          className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <Suspense fallback={<div>Loading...</div>}>
          <table
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <span>Name</span>
                </th>
                <th
                  scope="col"
                  className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Id
                </th>
                <th
                  scope="col"
                  className="px-0 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Status
                </th>

              </tr>
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {
                data?.map((user) => {
                return (
                <tr key={user._id}>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1160&amp;q=80"
                        alt="" />
                    </div>
                    <div className="ml-4">
                      <div
                        className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {user._id}
                  </div>
                </td>
                
                <td
                  className="px-0 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr> 
                    )
                }) }
            </tbody>
          </table>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  )
}