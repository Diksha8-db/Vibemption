import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import axios from '../utils/axios.js';
import { usePlaylist } from "../context/PlaylistContext";
import { toast } from "react-toastify";

function Player() {
  const { playlist } = usePlaylist();
  console.log(playlist);
  
  const trackSong = playlist?.tracks || [];

  // State to keep track of each track's favorite status
  const [favourites, setFavourites] = useState({});

  useEffect(() => {

    const initialFavorites = trackSong.reduce((acc, song) => {
      acc[song._id] = false; 
      return acc;
    }, {});
    setFavourites(initialFavorites);
  }, [trackSong]);

  // Function to extract YouTube video ID
  function getVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/\S+\/|\S+\/|(?:v|e(?:mbed)?)\/|\S+\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match && match[1];
  }

  const handleAddToFavourites = async (e, songId) => {
    e.preventDefault();
    try {
      await axios
      .post('/favourites/',
         { trackId : songId,
          }, { withCredentials: true });
      setFavourites((prevFavorites) => ({ ...prevFavorites, [songId]: true }));
      toast.success("Added to favorites");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not add to favorites");
    }
  };

  const handleDeleteFromFavourites = async (e, songId) => {
    e.preventDefault();
    try {
      await axios.delete('/favourites/', { data: { trackId : songId } }, { withCredentials: true });
      setFavourites((prevFavorites) => ({ ...prevFavorites, [songId]: false }));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not remove from favorites");
    }
  };

  return (
    <div className='pt-3'>
      {trackSong.map((song, index) => {
        const videoId = getVideoId(song.link);
        const isFavourite = favourites[song._id];

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
                onClick={(e) => (isFavourite ? handleDeleteFromFavourites(e, song._id) : handleAddToFavourites(e, song._id))}
              >
                <Heart fill={isFavourite ? "#E60178" : "white"} strokeWidth={isFavourite ? 0 : 1} color="blue" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Player;
