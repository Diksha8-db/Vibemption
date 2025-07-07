import React, { useEffect, useState } from 'react'
import { Heart, Music, Smile, Play, House, Bookmark, LayoutDashboard, Star, ListMusic } from 'lucide-react';
import {toast} from 'react-toastify'
import axios from '../utils/axios.js'
import '../index.css'
import Loader from '../ui/Loader.jsx';

function UserDashboard() {
    const navItems = [
        {
          name: "Home",
          href: "#home",
          icon: <House />,
        },
        {
          name: "About",
          href: "/#about",
          icon: <Bookmark />,
        },
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: <LayoutDashboard />,
        },
        {
          name: "Favorites",
          href: "/favourites",
          icon: <Star />,
        },
        {
          name: "Playlist",
          href: "/explore",
          icon: <ListMusic />,
        },
      ];
    const [user, setUser] = useState(null)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUserDetails = async() => {

            try{
                const userDetails = await axios.get('/users/user-dashboard',
                    {
                        withCredentials: true,
                    }
                )

                if(!userDetails?.data?.data){
                    toast.error("User not found!!")
                }
                console.log(userDetails.data.data)
                setUser(userDetails.data.data)
            }
            catch(error){
                toast.error(error.response?.data?.message || "Unable to fetch user details")
            }
            finally{
                setIsLoading(false)
            }
        } 

        fetchUserDetails();
    },[])

  return (
    <>
    {loading ? <Loader/> : 
        <section className='w-full'>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <div className='col-span-1 py-30 lg:flex hidden'>
                <div className="flex-col gap-9 pl-12 ">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  className="text-white flex gap-4 cursor-pointer items-center"
                >
                  <p className="text-(--color-purple-200) hover:text-purple-400">
                    {item.icon}
                  </p>
                  <p className="text-(--color-secondary) hover:text-purple-600">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>
                </div>
           

        <div
        className='w-full mx-auto px-2 py-20 flex flex-col gap-[5rem] col-span-3'
        >
        <h1 className='text-(--color-primary) text-5xl font-semibold text-center px-2 py-2'>User Profile</h1>

            {/* name div */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 w-[90%] md:w-[80%] mx-auto'>
                <div className='flex items-center w-[80%] mx-auto'>

                        <img src={user.coverImage ? user.coverImage : 'https://static.vecteezy.com/system/resources/previews/004/773/704/original/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg'}
                        className=' rounded-full mx-auto object-fit md:w-50 md:h-50 h-44 w-44'
                        />
                    
                </div>

                {/* Personal Information */}
                <div className='flex flex-col gap-4 px-4'>
                    <h1 className='text-white font-semibold text-4xl'>{user.fullName}</h1>
                    <h1 className='text-(--color-secondary) text-lg'>{user.email}</h1>
                    <a
                    href='/update-profile'
                    className='px-3 py-2 bg-[#1c0f2c] cursor-pointer hover:opcaity-75 transition-opacity duration-500 text-(--color-secondary) text-lg rounded-xl hover:border-1 hover:border-violet-950 mt-4 text-center'
                    >
                        Update Profile
                    </a>
                </div>
            </div>

            {/* Recent activity*/}
            <div className='mx-auto py-8 px-2 flex flex-col gap-10'>
                <h1 className='text-(--color-primary) text-4xl font-semibold text-center'>Recent Activity</h1>
                <p className='text-white text-center lg:text-lg'>Want to see how you have been recently....Want to explore your liked playlists....have a look? </p>
                <div className='flex w-full justify-between md:text-xl'>
                    <a
                    href='/favourites' 
                    className='dashBtn'> 
                        Favourites
                        <Heart color="red"/>
                    </a>
                    <a
                    href='/'
                    className='dashBtn'>
                        Playlists
                        <Music color="pink"/>    
                    </a>
                </div>

                {/* Recent playlist */}
                <div className='grid grid-cols-1 gap-4'>

                    {/* vibe div */}
                    <div className='flex flex-row gap-3 text-lg items-center text-white bg-[#261434] px-5 py-2 rounded-xl  hover:opacity-75 transition-all duration-500'>
                    <p><Smile color="#5954EA"/></p>
                    <p>Vibe set to : </p>
                    <p className='font-semibold'>Happy</p>
                    </div>

                    {/* Playlist div */}
                    <div className='flex flex-row gap-3 text-lg items-center bg-[#261434] px-5 py-2 rounded-xl text-white hover:opacity-75 transition-all duration-500'>
                        <p><Play color="purple"/></p>
                        <p>Playlist Created : </p>
                        <p className='font-semibold'>Evening Groom</p>
                    </div>

                    {/* music div */}
                    <div className='flex flex-row gap-3 text-lg items-center bg-[#261434] px-5 py-2 rounded-xl text-white hover:opacity-75  transition-all duration-500'>
                        <p><Music color="pink"/></p>
                        <p>Song Played</p>
                        <p className='font-semibold'>Chill Nights</p>
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
    </section>
    }
    </>
    
  )
}

export default UserDashboard