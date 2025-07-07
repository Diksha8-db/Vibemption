import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function About() {
  const [gifiLink, setGifLink] = useState(false);

  const url =
    "https://lottie.host/ec2a0675-ffce-46ee-a6bd-2bc3b901338d/Sk7ppr0vvN.lottie";

  useEffect(() => {
    const checkExistence = async () => {
      try {
        const response = await fetch(url);
        setGifLink(response.ok);
      } catch (error) {
        console.log(error);
        setGifLink(false);
      }
    };

    checkExistence();
  }, []);

  return (
    <section
    id='about'
    className='w-full px-2 py-8'
    >
      <div className='w-[90%] md:w-[80%] mx-auto flex flex-col gap-10'>

        <h1 className='text-white text-3xl font-semibold text-center'>About <span className='text-(--color-primary)'>Vibemption</span></h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center'>


        <div>
            {gifiLink ? (
              <DotLottieReact src={url} loop autoplay />
            ) : ""}
          </div>
          
          <div className='text-(--color-white) flex flex-col gap-4 text-lg items-center'>
            <p 
            ><span className='text-(--color-primary) font-bold text-lg'>Vibemption</span> is where your emotions find their sound.</p>
            <p>With every click, mood , and moment - we listen, and we respond. Let your heartbeat guide the beats, and your feelings choose the flow.</p>
            <p>It's not just music - it's your emotional sidekick with beats. Made for late-night thoughts 💭 and worthy wins🏆</p>
            <a
            href="/#home"
            className='text-black bg-(--color-primary) rounded-2xl px-5 py-1 mt-6 text-center hover:bg-transparent hover:border-1 hover:border-(--color-primary) hover:text-(--color-primary) font-semibold transition-all duration-500 text-[16px]'>Explore Now</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
