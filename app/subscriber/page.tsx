import React from 'react'

const SubscriberPage = () => {
  return (
    <>
        <div className='flex items-center space-x-2'>
            <input type ="text" 
            placeholder="Enter your name..."
            className="flex-grow border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Request
            </button>
        </div>
    </>
  )
}

export default SubscriberPage
