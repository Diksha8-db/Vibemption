import React from 'react'
import Header from '../components/Header/Header'
import { Heart, Music, Smile, Play } from 'lucide-react';
import '../index.css'

function UserDashboard() {
  return (
    <section className='w-full'>
        <Header/>
        <div
        className='w-full lg:w-[60%] mx-auto px-2 py-4 flex flex-col gap-[5rem]'
        >
        <h1 className='text-(--color-primary) text-5xl font-semibold text-center px-2 py-2'>User Profile</h1>

            {/* name div */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0'>
                <div className='flex items-center w-[80%] mx-auto'>

                        <img src='https://static.vecteezy.com/system/resources/previews/004/773/704/original/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg'
                        className=' rounded-full h-44 mx-auto max-w-44'
                        />
                    
                </div>

                {/* Personal Information */}
                <div className='flex flex-col gap-4 px-4'>
                    <h1 className='text-white font-semibold text-4xl'>Diksha Bharti</h1>
                    <h1 className='text-(--color-secondary) text-lg'>email@gmai.com</h1>
                    <button
                    className='px-3 py-2 bg-[#1c0f2c] cursor-pointer hover:opcaity-75 transition-opacity duration-500 text-(--color-secondary) text-lg rounded-xl hover:border-1 hover:border-violet-950 mt-4'
                    >
                        Update Profile
                    </button>
                </div>
            </div>

            {/* Recent activity*/}
            <div className='mx-auto py-8 px-2 flex flex-col gap-10'>
                <h1 className='text-(--color-primary) text-4xl font-semibold text-center'>Recent Activity</h1>
                <p className='text-white text-center lg:text-lg'>Want to see how you have been recently....Want to explore your liked playlists....have a look? </p>
                <div className='flex w-full justify-between'>
                    <button className='dashBtn'> 
                        Favourites
                        <Heart color="red"/>
                    </button>
                    <button className='dashBtn'>
                        Playlists
                        <Music color="pink"/>    
                    </button>
                </div>

                {/* Recent playlist */}
                <div className='grid grid-cols-1 gap-4'>

                    {/* vibe div */}
                    <div className='flex flex-row gap-3 text-xl items-center text-white bg-[#261434] px-5 py-2 rounded-xl  hover:opacity-75 transition-all duration-500'>
                    <p><Smile color="#5954EA"/></p>
                    <p>Vibe set to : </p>
                    <p className='font-semibold'>Happy</p>
                    </div>

                    {/* Playlist div */}
                    <div className='flex flex-row gap-3 text-xl items-center bg-[#261434] px-5 py-2 rounded-xl text-white hover:opacity-75 transition-all duration-500'>
                        <p><Play color="purple"/></p>
                        <p>Playlist Created : </p>
                        <p className='font-semibold'>Evening Groom</p>
                    </div>

                    {/* music div */}
                    <div className='flex flex-row gap-3 text-xl items-center bg-[#261434] px-5 py-2 rounded-xl text-white hover:opacity-75  transition-all duration-500'>
                        <p><Music color="pink"/></p>
                        <p>Song Played</p>
                        <p className='font-semibold'>Chill Nights</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default UserDashboard