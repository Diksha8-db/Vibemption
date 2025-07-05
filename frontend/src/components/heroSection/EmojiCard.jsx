import React from "react";
import {
  Smile,
  Frown,
  Headphones,
  Flame,
  Moon,
  MessageCircle,
  Lightbulb,
  Angry,
} from "lucide-react";

function EmojiCard() {
  const emotions = [
    {
      name: "Happy",
      icon: <Smile color="#4F68FE" size={50}/>,
      quote: "Bright beats, loud smiles - happiness on repeat",
    },
    {
      name: "Sad",
      icon: <Frown color="#A282EA" size={50}/>,
      quote: "Not every beat is bright - and that’s okay",
    },
    {
      name: "Chill",
      icon: <Headphones color="#39AAEB" size={50}/>,
      quote: "Slow down. Breathe in. Drift with the vibe",
    },
    {
      name: "Energetic",
      icon: <Flame color="#F26D1A" size={50}/>,
      quote: "Fast drops, fire tempo — feel the surge in every beat.",
    },
    {
      name: "Relaxed",
      icon: <Moon color="#41F2F2" size={50}/>,
      quote: "Low bpm, deep vibes — exhale to the rhythm",
    },
    {
      name: "Angry",
      icon: <Angry color="#FA3F3F" size={50}/>,
      quote: "When words fail, let the beat throw punches",
    },
    {
      name: "Focussed",
      icon: <Lightbulb color="#09F4D8" size={50}/>,
      quote: "Sharp beats, zero noise — stay locked in the rhythm",
    },
    {
      name: "Reflective",
      icon: <MessageCircle color="#BE33E9" size={50}/>,
      quote: "Echoes of thought. Beats that look back with you",
    },
  ];

  return (
    <div className='w-full py-3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {emotions.map((emotion, index) => (
        <a
        key = {index}
        className='px-5 cursor-pointer py-5 flex gap-4 shadow-2xl shadow-[#1f1130] rounded-lg items-center'
        >
            {/* icons */}
          <div>
            {emotion.icon}
          </div>
            {/* name and quote */}
          <div className='flex flex-col gap-3'>
            <h1 className='text-white text-2xl'>{emotion.name}</h1>
            <p className='text-[#aaaaaa] text-left'>{emotion.quote}.</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default EmojiCard;
