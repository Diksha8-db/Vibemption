import { Play, Pause, Heart } from "lucide-react";
import React,{useState} from "react";

const FloatingPlayer = () => {
    const [isFavourites, setIsFavourites] = useState(false)

    const [isPlaying, setIsPlaying] = useState(false)


  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] bg-[#1a0832] text-white rounded-2xl shadow-2xl p-4 flex items-center space-x-4 z-50 backdrop-blur-sm border border-white/10">
      {/* Album Art */}
      <img
        src="https://www.bing.com/th/id/OIP.uK2jTx2c61m8qIztceSfYgHaHa?w=194&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" // replace with your song image
        alt="Album Art"
        className="w-14 h-14 rounded-lg object-cover"
      />

      {/* Song Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold">Dream Waves</h3>
        <p className="text-xs text-gray-400">Artist Name</p>
        <div className="w-full h-1 bg-gray-700 mt-2 rounded-full overflow-hidden">
          <div className="w-1/5 h-full bg-white" />
        </div>
        <div className="text-xs text-gray-400 flex justify-between mt-1">
          <span>0:02</span>
          <span>2:57</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button className="text-gray-200 hover:text-pink-500" onClick={() => setIsFavourites(!isFavourites)}>
            {isFavourites ? 
          
          <Heart size={18} fill="#F656A9" strokeWidth={0} />
          :
          <Heart size={16} />
            }
        </button>

        <button className="text-white hover:text-green-400" onClick={() => setIsPlaying(!isPlaying)}>
         {isPlaying ? 
            
            <Pause size={18} color="#1ed760"/>
            :
            <Play size={18} />
         }
        </button>
      </div>
    </div>
  );
};

export default FloatingPlayer;