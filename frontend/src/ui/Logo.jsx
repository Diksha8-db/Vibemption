import React from "react";
import { AudioLines } from "lucide-react";

function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <AudioLines color="#1ed760" size={28} />
      <h1 className="font-semibold text-white font-inter text-xl md:text-2xl">
        Vibemption
      </h1>
    </div>
  );
}

export default Logo;
