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
    if (!socket) return;
    liveMessages();

    return () => unliveMessage();
  }, [selectedUser?._id, getMessages, unliveMessage, liveMessages, socket]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-black/80">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
        {isMessagesLoading ? (
          <p className="text-center text-white/40 text-sm mt-6">
            Loading messages...
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-white/40 text-sm mt-6">
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
                  className={`relative max-w-full px-4 py-1 rounded-lg text-sm text-white
          ${isMe ? "bg-white/20 rounded-br-sm" : "bg-white/10 rounded-bl-sm"}
        `}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="sent"
                      className="mb-2 rounded-lg max-h-60 object-cover"
                    />
                  )}

                  {msg.text && <p className="leading-relaxed">{msg.text}</p>}

                  {/* Time */}
                  <div
                    className={`mt-1 text-[11px] text-white/40 text-right select-none`}
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
