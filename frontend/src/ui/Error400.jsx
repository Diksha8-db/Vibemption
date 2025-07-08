import React from 'react'
import {Link} from 'react-router-dom'

function Error400() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className='py-10 text-center w-[80%] md:w-[60%] mx-auto flex flex-col gap-10'>
        <h1
        className='text-white text-3xl font-semibold'
        >404 - Page not found</h1>
        <p
        className='text-gray-300'
        >It seems that the page you are looking is not available</p>
        <p
        className='text-gray-300'
        >Please ensure to login/signup to listen to your fav track🎶 </p>

        <Link 
        to='/'
        className='font-semibold px-4 py-2 bg-green-400 text-gray-950 rounded-xl hover:bg-transparent hover:border-2 border-green-400 hover:text-green-400'>
        Go Home
        </Link>
    </div>
    </div>
  )
}

export default Error400