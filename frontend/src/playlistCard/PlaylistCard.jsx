import React from "react";
import Player from "./Player";
import { usePlaylist } from "../context/PlaylistContext";
import { toast } from "react-toastify";
import { Youtube } from "lucide-react";

function PlaylistCard() {

   const {playlist} = usePlaylist()

   console.log(playlist)

   if(!playlist){
    toast.error("Playlist not found")
   }

  return (
    <section className="w-full min-h-screen py-20 flex flex-col gap-10">
      <div
        className={`w-[80%] lg:w-[60%] mx-auto rounded-lg  flex flex-col items-center gap-15`}
      >
        
        {/* thought and mood display */}
        <div className="flex flex-col gap-5">
          <div className=" flex flex-col items-center justify-center gap-4">
            {/* mood heading */}
            <h1 className="text-center text-white text-4xl font-medium">
              Your vibe : <span className="text-green-400 font-semibold">{playlist.emotion}</span>
            </h1>
            <h1 className="text-center text-white text-xl font-medium flex items-center gap-1">
              Source : <span className="text-[#f36242] font-semibold">{playlist.source}</span> <span>
                <Youtube color="#FD3A3A" size={28}/>
              </span>
            </h1>
          <h1 className='text-center text-green-500 lg:text-lg mt-10'>
            Your playlist is ready 🎭 . Enjoy the music and don't forget to save your favorite track 🎶.
          </h1>
          </div>

        </div>

        {/* palylist div */}
        <div className="w-full">
          <Player/>
        </div>

      </div>
    </section>
  );
}

export default PlaylistCard;
