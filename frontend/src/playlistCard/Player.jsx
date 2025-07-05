import React, { useState } from "react";
import { Heart, Music } from "lucide-react";

function Player() {

  const [isFavourites, setIsFavourites] = useState(false);

  return (
    <div className='pt-3'>
      <div className="px-4 py-2 bg-[#241132] hover:opacity-60 transition-all duration-300 rounded-xl flex flex-row items-center justify-between">
        <div className="flex flex-row gap-6">

          <button className="px-3 cursor-pointer bg-blue-950 rounded-full flex items-center"
          >

              <Music strokeWidth={2} color="#1ed760" />
          </button>

          <div>
            <h1 className="text-lg md:text-xl text-white font-semibold">Sunny Beats</h1>
            <h1 className='text-(--color-secondary)'>Lizzo</h1>
          </div>
        </div>

        <div className="text-xl flex flex-row gap-4">
          <p className="font-semibold text-gray-300">2:39</p>

          {/* adding to favourites */}
          <button
          className='cursor-pointer md:block hidden'
            onClick={() => setIsFavourites(!isFavourites)}
          >
            {isFavourites ? (
              <Heart fill="#E60178" size={32} strokeWidth={0} />
            ) : (
              <Heart fill="white" strokeWidth={1} color="blue" size={32} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
