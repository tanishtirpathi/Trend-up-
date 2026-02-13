import React from "react";
import { MorphingText } from "./ui/morphing-text";
import { Meteors } from "./ui/meteors";
function NoChat() {
  return (
    <div className="flex w-full items-center justify-center h-screen bg-white/90 text-black overflow-hidden">
      <Meteors />
      <MorphingText texts={["Trend up ", "chat", "secure chat"]} />
    </div>
  );
}

export default NoChat;
