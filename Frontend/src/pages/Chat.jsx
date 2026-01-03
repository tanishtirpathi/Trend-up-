import React from "react";
import Navbar from "../components/Navbar";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChat from "../components/NoChat";
import ChatSection from "../components/ChatSection";

export function Chat() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen w-screen bg-black/95 flex flex-col overflow-hidden">
      {/* Navbar */}
      <Navbar />
      {/* Main Layout */}
      <div className="flex-1 flex justify-center overflow-hidden mt-15">
        {/* Centered container for desktop */}
        <div className="flex w-full overflow-hidden border border-white/10">
          
          {/* Sidebar */}
          <aside
            className={`
              bg-black/60 backdrop-blur-xl border-r border-white/10
              w-full sm:w-[260px] lg:w-[320px]
              ${selectedUser ? "hidden sm:block" : "block"}
            `}
          >
            <Sidebar />
          </aside>

          {/* Chat Section */}
          <main className="flex-1 bg-black/80 backdrop-blur-xl">
            {selectedUser ? <ChatSection /> : <NoChat />}
          </main>
        </div>
      </div>
    </div>
  );
}
