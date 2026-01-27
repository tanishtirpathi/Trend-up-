import React from "react";
import { ArrowLeft, Video } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUser = [] } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUser.includes(selectedUser._id);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Back button (mobile only) */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden text-white/70 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Avatar */}
        <div className="relative">
          <img
            src={selectedUser.avatar || "/image.png"}
            alt={selectedUser.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-black
              ${isOnline ? "bg-green-400" : "bg-red-400"}
            `}
          />
        </div>

        {/* Name + status */}
        <div className="leading-tight">
          <p className="text-sm font-medium text-white">
            {selectedUser.name}
          </p>
          <p className="text-xs text-white/50">
            {isOnline ? "online" : "offline"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
