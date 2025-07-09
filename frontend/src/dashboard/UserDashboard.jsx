import React, { useEffect, useState } from "react";
import {
  Heart,
  Music,
  House,
  Bookmark,
  LayoutDashboard,
  Star,
  ListMusic,
} from "lucide-react";
import Chart from "chart.js/auto";
import { toast } from "react-toastify";
import axios from "../utils/axios.js";
import "../index.css";
import Loader from "../ui/Loader.jsx";
import demoProfilePicture from '../images/demoProfilePicture.jpg'

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
  const [user, setUser] = useState(null);
  const [emotionList, getEmotionList] = useState([]);

  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await axios.get("/users/user-dashboard", {
          withCredentials: true,
        });

        const emotionName = userDetails.data?.data?.watchHistory;

        getEmotionList(emotionName);


        if (!userDetails?.data?.data) {
          toast.error("User not found!!");
        }

        setUser(userDetails.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to fetch user details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (!emotionList || emotionList.length === 0) return;
  
    const ctx = document.getElementById("moodChart");
    if (!ctx) return;
  
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: emotionList.map((emotion) => emotion.emotionName),
        datasets: [
          {
            label: "Mood frequency",
            data: emotionList.map((emotion) => emotion.count),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#ff6456",
              "#f65342",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#ADAEA4",
              font: {
                size : 18,
                weight : 'bold'
              },
              padding: 20,
              boxWidth: 20
            },
          },
        },
      },
    });
  
    return () => {
      chart.destroy(); // clean up
    };
  }, [emotionList]);
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="w-full">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="col-span-1 py-30 lg:flex hidden">
              <div className="flex-col pl-12 ">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    className="text-white mt-7 flex gap-4 cursor-pointer items-center"
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

            <div className="w-full mx-auto px-2 py-20 flex flex-col gap-[5rem] col-span-3">
              <h1 className="text-(--color-primary) text-5xl font-semibold text-center px-2 py-2">
                User Profile
              </h1>

              {/* name div */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 w-[90%] md:w-[80%] mx-auto">
                <div className="flex items-center w-[80%] mx-auto">
                  <img
                    src={
                      user?.coverImage || demoProfilePicture
                    }
                    className=" rounded-full mx-auto object-fit md:w-50 md:h-50 h-44 w-44"
                  />
                </div>

                {/* Personal Information */}
                <div className="flex flex-col gap-4 px-4">
                  <h1 className="text-white font-semibold text-4xl">
                    {user.fullName}
                  </h1>
                  <h1 className="text-(--color-secondary) text-lg">
                    {user.email}
                  </h1>
                  <a
                    href="/update-profile"
                    className="px-3 py-2 bg-[#1c0f2c] cursor-pointer hover:opcaity-75 transition-opacity duration-500 text-(--color-secondary) text-lg rounded-xl hover:border-1 hover:border-violet-950 mt-4 text-center"
                  >
                    Update Profile
                  </a>
                </div>
              </div>

              {/* Recent activity*/}
              <div className="mx-auto py-8 px-2 flex flex-col gap-10">
                <h1 className="text-(--color-primary) text-4xl font-semibold text-center">
                  User Analytics
                </h1>
                <p className="text-white text-center lg:text-lg">
                  Want to see how you have been recently....Want to explore your
                  liked playlists....have a look?{" "}
                </p>
                

                {/* Recent moods and fav button */}
                <div className="grid grid-cols-1 gap-7 h-[50%]">
                  {/* chart of the mood fetched from the user database */}
                  <h1 className='text-center text-xl text-purple-500 font-semibold'>Mood Analysis 🎭</h1>
                  { (emotionList.length > 0) ? 
                  <canvas
                    id="moodChart" 
                    width="300"
                    height="300"
                    className='mx-auto' 
                  ></canvas>
                  :
                  <div className='flex flex-col gap-4 items-center'>
                  <h1 className='text-gray-400 text-lg '>Explore playlists to track your mood history</h1>
                  <a
                  href='/' 
                  className='bg-green-400 rounded-xl px-4 py-2 text-center'>Explore Playlist</a>
                  </div>
                  
                  }
                </div>

                <div className='flex flex-col gap-7 mt-20'>
                <h1 className='text-center text-xl text-purple-500 font-semibold'>Useful Links 🔗 </h1>
                <div className='flex flex-col gap-3'>
                <a
                  href="/favourites"
                  className='text-center flex gap-2 bg-pink-800 px-6 py-2 rounded-xl text-gray-300 items-center justify-center text-lg hover:translate-y-1 hover:shadow-2xs mx-auto font-semibold'>
                    Tap to view favourites<Heart fill="#F481DC" stroke="0" size="30"/>
                  </a>
                  <a
                  href="/#hero"
                  className='text-center flex gap-4 bg-pink-800 px-6 py-2 rounded-xl text-gray-300 items-center justify-center text-lg hover:translate-y-1 hover:shadow-2xs mx-auto font-semibold'>
                    Tap to explore more<Music/>
                  </a>
                </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default UserDashboard;
