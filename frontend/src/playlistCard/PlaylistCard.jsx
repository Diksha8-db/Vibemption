import React from "react";
import Header from "../components/Header/Header";
import FloatingMusicPlayer from "./FloatingMusicPlayer";
import Player from "./Player";

function PlaylistCard({ mood, thought, icon }) {
  return (
    <section className="w-full min-h-screen py-2 flex flex-col gap-10">
      <Header />
      <div
        className={`w-[80%] lg:w-[60%] mx-auto rounded-lg  flex flex-col items-center gap-15`}
      >
        
        {/* thought and mood display */}
        <div className="flex flex-col gap-5">
          <div className=" flex flex-row items-center justify-center gap-4">
            {/* mood heading */}
            <h1 className="text-center text-white text-4xl font-medium">
              Your vibe : <span className="font-bold">{mood}</span> <span className="text-4xl">{icon}</span>
            </h1>

          </div>

          <p className="text-(--color-secondary) font-semibold text-xl text-center px-2 py-2">
            {thought}
          </p>
        </div>

        {/* palylist div */}
        <div className="w-full">
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
        </div>

        <div>
          <FloatingMusicPlayer />
        </div>
      </div>
    </section>
  );
}

export default PlaylistCard;
