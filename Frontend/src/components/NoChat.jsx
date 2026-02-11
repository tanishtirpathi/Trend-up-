import React from "react";
import { MorphingText } from "./ui/morphing-text";
import { Meteors } from "./ui/meteors";
function NoChat() {
  return (
    <div className="flex w-full items-center justify-center h-screen bg-black text-white  overflow-hidden">
      <Meteors />
      <MorphingText texts={["Trend up ", "chat", "video call "]} />
    </div>
  );
}

export default NoChat;
