import React from 'react'
import EmojiCard from './EmojiCard'
import '../../index.css'

function Hero() {
  // sends the fetched emotion
  const sendEmotion = (event) => {
    event.preventDefault();
  }



  return (
    <section
     id="#home"
     className='w-full px-2 py-8'>
        <div className='w-[80%] lg:w-[70%] mx-auto flex flex-col gap-6 md:gap-12'>
            {/* Heading */}
            <div className='pt-[5rem] md:pt-[6rem]'>
                <h1
                className='text-white text-center font-semibold text-4xl md:text-5xl md:font-bold font-poppins heroSection'
                >Let your <span className='text-[#1ed760]'>vibe</span> lead. We'll handle the <span className='text-[#1ed760] text-5xl'>music</span>.</h1>
            </div>
            {/* Input mood and search button */}
            <div className='flex flex-col items-center gap-5'>
              <h1
              className='text-(--color-primary) text-center text-xl font-medium'
              >Enter how you feel. Let music heal</h1>
              <input
              type="text"
              placeholder="I'm feeling....."
              name="moodName"
              className='text-(--color-secondary) items-center jsutify-center w-[60%] px-4 py-2 outline-none rounded-2xl bg-[#1c0f2c]'
              />
              <button
              onClick={sendEmotion}
              className='bg-(--color-primary) px-4 py-2 rounded-4xl text-(--color-blue-900) font-semibold opacity-95 hover:bg-[#261f2f] hover:text-(--color-primary) hover:border-2 hover:border-(--color-primary) cursor-pointer transition-all duration-500 text-[16px]'
              >Generate Playlist</button>
            </div>

            {/* Mood */}
            <div>
                <EmojiCard/>
            </div>
        </div>
    </section>
  )
}

export default Hero