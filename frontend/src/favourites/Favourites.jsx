import React, { useState } from 'react'
import Player from '../playlistCard/Player'
import FloatingPlayer from '../playlistCard/FloatingMusicPlayer'
import Header from '../components/Header/Header'

function Favourites() {

    const [haveFavourites, setHaveFvaourites] = useState(true)

  return (
    <div className='w-full min-h-screen py-3'>
        <Header/>
        <div className='w-[80%] mt-[4.75rem] flex flex-col gap-[5rem] lg:w-[60%] mx-auto'>
        <div className='flex flex-col gap-7 items-center'>
        <h1 className='text-3xl font-semibold text-white text-center'>Your Favourite Vibes</h1>
        
            {haveFavourites ?
                
            <p className='text-lg text-(--color-secondary) text-center'>Looks like you haven't added any songs to your favorites. Explore moods and start vibing!</p>    
                :
            <p>Songs you've saved that match your moods perfectly. Revisit your top vibes anytime, anywhere.</p>}
        

        <button
        className='bg-(--color-primary) rounded-xl  px-3 py-2 hover:opacity-70 cursor-pointer transition-opacity duration-500'
        >
            Exlpore moods
        </button>
        </div>
        
        <div>
        <Player/>
        <Player/>
        </div>
        
        <FloatingPlayer/>
        </div>

    </div>
  )
}

export default Favourites