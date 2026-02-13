import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import FooterInput from "./FooterInput";
import { useAuthStore } from "../store/useAuthStore";

function ChatSection() {
  const {
    messages,
    unliveMessage,
    getMessages,
    isMessagesLoading,
    markAsSeen,
    selectedUser,
    liveMessages,
  } = useChatStore();

  const { socket } = useAuthStore();
  const bottomRef = useRef(null);

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    markAsSeen(selectedUser._id);
    if (!socket) return;
    liveMessages();

    return () => unliveMessage();
  }, [
    selectedUser?._id,
    getMessages,
    markAsSeen,
    unliveMessage,
    liveMessages,
    socket,
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {isMessagesLoading ? (
          <p className="text-center text-slate-400 text-sm mt-6 font-serif">
            Loading messages...
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-slate-400 text-sm mt-6 font-serif">
            Start the conversation 👋
          </p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId !== selectedUser._id;

            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative font-serif max-w-[70%] px-4 py-3 rounded-xl text-sm leading-relaxed
                  ${
                    isMe
                      ? "bg-black/70 text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="sent"
                      onClick={() => window.open(msg.image, "_blank")}
                      className="mb-2 rounded-lg max-h-60 object-cover"
                    />
                  )}

                  {msg.text && <p>{msg.text}</p>}

                  {/* Time */}
                  <div
                    className={`mt-2 text-[11px] text-right select-none ${
                      isMe ? "text-white/70" : "text-slate-400"
                    }`}
                  >
                    {formatTime(msg.createdAt)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      <FooterInput />
    </div>
  );
}

export default ChatSection;
