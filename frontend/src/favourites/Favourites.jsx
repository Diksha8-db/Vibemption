import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axios from "../utils/axios.js";
import { toast } from "react-toastify";

function Favourites() {
  const [haveFavourites, setHaveFavourites] = useState(false);
  const [favTrack, setFavTrack] = useState([])

  function getVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/\S+\/|\S+\/|(?:v|e(?:mbed)?)\/|\S+\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match && match[1];
  }

  // Use useEffect hook to fetch favorites only once when the component mounts
  useEffect(() => {
    const fetchFav = async() => {
    try{
      const response = await axios.get('/favourites', {
        withCredentials: true
      })

      console.log("Fav Response on frontend",response.data.data);
      setFavTrack(response.data.data);
      if(response.data.data.length > 0){
        setHaveFavourites(true);
      }
      

    }
    catch(error){
      toast.error(error.response?.data?.message || "Something went wrong !!");
    }
  }

  fetchFav();
  }, []); 


  const handleDeleteFromFavourites = async (e, songId) => {
    e.preventDefault();

    try {
      await axios.delete('/favourites/', { data: { trackId : songId } }, { withCredentials: true });


      e.target.style.display = "none"
      toast.success("Removed from favorites");


    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not remove from favorites");
    }
  };

  return (
    <div className="w-full min-h-screen py-3">
      <div className="w-[80%] mt-[4.75rem] flex flex-col gap-[5rem] lg:w-[60%] mx-auto">
        <div className="flex flex-col gap-7 items-center">
          <h1 className="text-3xl font-semibold text-white text-center">
            Your Favourite Vibes
          </h1>

          {!haveFavourites ? (
            <>
              <p className="text-lg text-gray-400 text-center">
                Looks like you haven't added any songs to your favorites.
                Explore moods and start vibing!
              </p>
              <a
                href="/"
                className="bg-green-400 rounded-xl px-3 py-2 hover:opacity-70 cursor-pointer transition-opacity duration-500"
              >
                Explore moods
              </a>
            </>
          ) : (
            <p className="text-lg text-gray-400 text-center">
              Songs you've saved that match your moods perfectly. Revisit your
              top vibes anytime, anywhere.
            </p>
          )}
        </div>
        <div className='pt-3'>
      {
      
      favTrack.map((song, index) => {
        const videoId = getVideoId(song.link);

        
        return (
          <div
            key={index}
            className="px-4 py-2 bg-[#241132] hover:opacity-60 transition-all duration-300 rounded-xl flex flex-row items-center justify-between mb-6"
          >
            <div className="flex flex-row gap-6 items-center">
              <iframe
              className='object-cover rounded-sm'
                width="40" height="40" src={`https://www.youtube.com/embed/${videoId}`}
              />

              <div className='flex flex-col gap-2'>
                <h1 className="text-sm md:text-xl text-white font-semibold">{song.title}</h1>
                <h1 className='text-sm md:text-lg text-gray-400'>{song.channelTitle}</h1>
              </div>
            </div>

            <div className="text-xl flex flex-row gap-4">
              {/* Add or Remove from Favorites */}
              <button
                className='cursor-pointer'
                onClick={(e) => handleDeleteFromFavourites(e, song._id)}
              >
                <Heart fill="#E60178"  strokeWidth={0} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
      </div>
    </div>
  );
}

export default Favourites;
