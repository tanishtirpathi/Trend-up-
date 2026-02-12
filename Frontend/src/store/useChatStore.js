import { create } from "zustand";
import { axiosInstants } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  unreadCounts: {},
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUser: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstants.get("/messages/users");
      set({ users: res.data.data });
    } catch (error) {
      console.log("this is ur error : ", error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstants.get(`/messages/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      console.log("this is ur error : ", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (formData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstants.post(
        `/messages/send/${selectedUser._id}`,
        formData,
      );
      // ✅ Add message locally instantly
      set({ messages: [...messages, res.data.data] });
    } catch (error) {
      console.log("Send message error:", error);
    }
  },

  liveMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("NewMessage");

    socket.on("NewMessage", (newMessage) => {
      const { selectedUser } = get();

      if (
        selectedUser &&
        (newMessage.senderId === selectedUser._id ||
          newMessage.receiverId === selectedUser._id)
      ) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
      socket.on("messageDeleted", (messageId) => {
        set((state) => ({
          messages: state.messages.filter((msg) => msg._id !== messageId),
        }));
      });
    });
    socket.on("newNotification", ({ from }) => {
      const { selectedUser } = get();

      // If chat is NOT currently open, increase unread
      if (!selectedUser || selectedUser._id !== from) {
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [from]: (state.unreadCounts[from] || 0) + 1,
          },
        }));
      }
    });
  },

  unliveMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("NewMessage");
  },
  markAsSeen: async (userId) => {
    try {
      await axiosInstants.put(`/messages/seen/${userId}`);
      set((state) => {
        const updated = { ...state.unreadCounts };
        delete updated[userId];
        return { unreadCounts: updated };
      });
    } catch (error) {
      console.log("Mark as seen error:", error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
