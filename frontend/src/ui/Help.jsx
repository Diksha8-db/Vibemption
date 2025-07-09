import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Github, Home, Linkedin, } from "lucide-react";
import ContactForm from "./ContactForm";

function Help() {
  return (
    <section className='w-full py-10 pt-20'>
      <div className='w-[80%] mx-auto flex flex-col gap-20'>
        <div>
          <h1 className='text-green-400 text-4xl font-semibold text-center mb-10'>How Vibemption Work ?</h1>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
            <div>
              <DotLottieReact
                src="https://lottie.host/81c3e82e-3885-4796-a1c3-e2e385624fe3/0iJWgjzFu6.lottie"
                loop
                autoplay
              />
            </div>
            <div  className='text-gray-300 flex flex-col gap-4 items-center'>
                <p className='text-gray-400'>Feeling a <span className='text-purple-600 font-bold text-lg'>vibe?</span>  Just type how you're feeling—sad, excited, calm, or anything in between. Vibemption’s smart mood AI reads your emotions and instantly curates a playlist that matches your energy. Whether you're looking to heal, hype, or just vibe, your next soundtrack is one click away. No generic playlists—just music that feels you. Save your favorites, revisit your past moods, and let your heart pick the beat.
                </p>


                <div className='flex flex-col gap-5'>
                <p>
                    <span className='text-purple-600 font-semibold'>STEP 1</span> : Login / Register to enjoy the vibe .
                </p>
                <p> <span className='text-purple-600 font-semibold'>STEP 2</span> : Type the mood or your feeling🎭 and wait while we analyse it.</p>
                <p><span className='text-purple-600 font-semibold'>STEP 3</span>: Enjoy the playlist served and mark your favs💖</p>
                <p><span className='text-purple-600 font-semibold'>STEP 4</span>: Go to your personalised dashboard and see how you were in past days..⌛</p>

                </div>
                <button
                className='items-center flex gap-2 bg-purple-500 justify-center px-6 py-2 rounded-xl font-semibold hover:border-2 hover:bg-transparent hover:text-purple-500'
                ><Home/> Home</button>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-8 text-justify'> 
            <h1 className='text-green-400 text-4xl font-semibold text-center'>
                Contact Us
            </h1>
            <p 
            className='text-gray-400'
            >Need Help? We’re Here for You.
Got a question, suggestion, or just want to say hi? The Vibemption lead is always ready to help. Whether you're facing issues, have feedback to share, or need guidance using the app — don’t hesitate to reach out. We value every voice in our community. You can contact us anytime via email, connect with us on social media, or drop your thoughts through our feedback form. Let's vibe together, better!
</p>
            <div className='flex flex-row justify-evenly text-white'>
                <a
                href='https://github.com/Diksha8-db'
                className='hover:opacity-70'
                >
                    <Github size={34}/>
                </a>
                <a
                href='https://www.linkedin.com/in/diksha-bharti-055499326/'
                className='hover:opacity-70' 
                >
                    <Linkedin color="#4E8AE3" size={34}/>
                </a>
            </div>
        </div>
        <div>
            <h1
            className='text-xl text-green-400 text-center font-semibold'
            >Your feedback matters✍️!!</h1>
            
            <p className='text-green-100 text-center'>(It will take less than a minute..)</p>
            <ContactForm/>
        </div>
      </div>
    </section>
  );
}

export default Help;
