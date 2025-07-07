import { Play, Pause, Heart } from "lucide-react";
import React, { useState } from "react";
import { usePlaylist } from "../context/PlaylistContext";

const FloatingPlayer = ({currentTrackIndex}) => {
  const [isFavourites, setIsFavourites] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
 
  const { playlist } = usePlaylist();

  if (!playlist?.tracks || playlist.tracks.length === 0) {
    return null; 
  }

  const track = playlist.tracks[0];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] bg-[#1a0832] text-white rounded-2xl shadow-2xl p-4 flex items-center space-x-4 z-50 backdrop-blur-sm border border-white/10">
      {/* Album Art */}
      <img
        src={
          track.thumbnail
            ? track.thumbnail
            : "https://img.lovepik.com/free-png/20211215/lovepik-song-of-love-png-image_401669880_wh1200.png"
        }
        alt="Album Art"
        className="w-14 h-14 rounded-lg object-cover"
      />

      {/* Song Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-1">{track.title}</h3>
        <p className="text-xs text-gray-400">{track.channelTitle}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          className="text-gray-200 hover:text-pink-500"
          onClick={() => setIsFavourites(!isFavourites)}
        >
          {isFavourites ? (
            <Heart size={18} fill="#F656A9" strokeWidth={0} />
          ) : (
            <Heart size={16} />
          )}
        </button>

        <button
          className="text-white hover:text-green-400"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause size={18} color="#1ed760" />
          ) : (
            <Play size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingPlayer;
