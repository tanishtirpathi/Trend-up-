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
  <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-black/10">

  {/* Left section */}
  <div className="flex items-center gap-2 sm:gap-3 min-w-0">

    {/* Back button (mobile only) */}
    <button
      onClick={() => setSelectedUser(null)}
      className="md:hidden p-2 -ml-2 text-black/70 hover:text-black active:scale-95 transition"
    >
      <ArrowLeft size={20} />
    </button>

    {/* Avatar */}
    <div className="relative shrink-0">
      <img
        src={selectedUser.avatar || "/image.png"}
        alt={selectedUser.name}
        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-black"
      />
      <span
        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-black
          ${isOnline ? "bg-green-400" : "bg-red-400"}
        `}
      />
    </div>

    {/* Name + status */}
    <div className="leading-tight min-w-0">
      <p className="text-sm sm:text-base font-medium text-black font-mono truncate">
        {selectedUser.name}
      </p>
      <p className="text-xs sm:text-sm text-black/50 font-serif">
        {isOnline ? "online" : "offline"}
      </p>
    </div>

  </div>
</div>
  );
}

export default ChatHeader;
