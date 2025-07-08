import React, { useState, useEffect } from "react";
import { Heart, Pause, Play } from "lucide-react";
import axios from '../utils/axios.js';
import { usePlaylist } from "../context/PlaylistContext";
import { toast } from "react-toastify";

function Player() {
  const { playlist } = usePlaylist();
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const trackSong = playlist?.tracks || [];

  const [favourites, setFavourites] = useState({});

  useEffect(() => {
    const initialFavorites = trackSong.reduce((acc, song) => {
      acc[song._id] = false;
      return acc;
    }, {});
    setFavourites(initialFavorites);
  }, [trackSong]);

  function getVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/\S+\/|\S+\/|(?:v|e(?:mbed)?)\/|\S+\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match && match[1];
  }

  const handleAddToFavourites = async (e, songId) => {
    e.preventDefault();
    try {
      await axios.post('/favourites/', { trackId: songId }, { withCredentials: true });
      setFavourites((prev) => ({ ...prev, [songId]: true }));
      toast.success("Added to favorites");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not add to favorites");
    }
  };

  const handleDeleteFromFavourites = async (e, songId) => {
    e.preventDefault();
    try {
      await axios.delete('/favourites/', {
        data: { trackId: songId },
        withCredentials: true
      });
      setFavourites((prev) => ({ ...prev, [songId]: false }));
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
        const isPlaying = playingTrackId === song._id;

        return (
          <div
            key={index}
            className="px-4 py-2 bg-[#241132] hover:opacity-60 transition-all duration-300 rounded-xl flex flex-row items-center justify-between mb-6"
          >
            <div className="flex flex-row gap-6 items-center">
              {/* Thumbnail or Mini-Player */}
              {!isPlaying ? (
                <iframe
                  className="object-cover rounded-sm"
                  width="40" height="40"
                  src={`https://www.youtube.com/embed/${videoId}`}
                />
              ) : (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] bg-[#1a0832] text-white rounded-2xl shadow-2xl p-4 flex items-center space-x-4 z-50 backdrop-blur-sm border border-white/10">
                  <iframe
                    className="object-cover rounded-sm"
                    width="40"
                    height="40"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    allow="autoplay"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold line-clamp-1">{song.title}</h3>
                    <p className="text-xs text-gray-400">{song.channelTitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="text-gray-200 hover:text-pink-500"
                      onClick={(e) =>
                        isFavourite
                          ? handleDeleteFromFavourites(e, song._id)
                          : handleAddToFavourites(e, song._id)
                      }
                    >
                      {isFavourite ? (
                        <Heart size={18} fill="#F656A9" strokeWidth={0} />
                      ) : (
                        <Heart size={16} />
                      )}
                    </button>

                    <button
                      className="text-white hover:text-green-400"
                      onClick={() => setPlayingTrackId(null)}
                    >
                      <Pause size={18} color="#1ed760" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <h1 className="text-sm md:text-lg text-white font-semibold">{song.title}</h1>
                <h1 className="text-sm text-gray-400">{song.channelTitle}</h1>
              </div>
            </div>

            <div className="text-xl flex flex-row gap-4">
              <button
                className="cursor-pointer"
                onClick={(e) =>
                  isFavourite
                    ? handleDeleteFromFavourites(e, song._id)
                    : handleAddToFavourites(e, song._id)
                }
              >
                <Heart
                  fill={isFavourite ? "#E60178" : "white"}
                  strokeWidth={isFavourite ? 0 : 1}
                  color="green"
                />
              </button>
              <button
                className="cursor-pointer"
                onClick={(e) => setPlayingTrackId(song._id)}
              >
                <Play
                  fill="white"
                  strokeWidth={1}
                  stroke="green"
                />
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Player;
