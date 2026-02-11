import { create } from "zustand";
import { axiosInstants } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
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
        formData
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
  });
},


  unliveMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("NewMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
