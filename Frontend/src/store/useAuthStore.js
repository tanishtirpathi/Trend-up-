import { axiosInstants } from "../lib/axios";
import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:4000";
//const BASE_URL = "https://trend-up-ipbl.onrender.com";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingUp: false,
  UpdatingProfile: false,
  isCheckingAuth: true,
  error: null,
  socket: null,
  onlineUser: [],
checkAuth: async () => {
  try {
    const res = await axiosInstants.get("/auth/me");
    set({ authUser: res.data.data });
    get().connectSocket();
  } catch (error) {
    // 🔥 TRY REFRESH TOKEN
    try {
      await axiosInstants.get("/auth/refresh");
      const res = await axiosInstants.get("/auth/me");
      set({ authUser: res.data.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    }
  } finally {
    set({ isCheckingAuth: false });
  }
},

  signUp: async (data) => {
    set({ isSigningUp: true, error: null });
    try {
      const res = await axiosInstants.post("/auth/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    set({ authUser: res.data.data });
      set({ error: "you are sign up " });
      get().connectSocket();
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Invalid credentials or something error",
      });
      console.log(`this is your sign up error ${error}`);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstants.get("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
    } catch (error) {
      console.log(`this is ur logout error ${error}`);
    }
  },
  login: async (data) => {
    set({ isLoggingUp: true, error: null });
    try {
      const res = await axiosInstants.post("/auth/login", data);
      set({ authUser: res.data.data });

      set({ error: "you are logged up " });
      get().connectSocket();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Invalid email or password",
      });
      console.log(`this is your sign up error ${error}`);
    } finally {
      set({ isLoggingUp: false });
    }
  },
  UpdateProfile: async (data) => {
    set({ UpdatingProfile: true });
    try {
      const res = await axiosInstants.put("/auth/update", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
     set({ authUser: res.data.data });

      get().connectSocket();
      console.log("user Update successfully ");
      alert("user Update successfully ");
    } catch (error) {
      console.log("profile error ", error);
      alert(`something went wrong :- ${error}`);
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("OnlineUsers", (userIds) => {
      set({ onlineUser: userIds });
    });
    // const { authUser, socket } = get();
    // if (!authUser?._id) return;

    // if (socket) {
    //   socket.disconnect();
    // }

    // const newSocket = io(BASE_URL, {
    //   auth: { userId: authUser._id },
    //   transports: ["websocket"],
    // });

    // newSocket.on("connect", () => {
    //   console.log("✅ Socket connected:", newSocket.id);
    // });

    // newSocket.on("OnlineUsers", (users) => {
    //   set({ onlineUser: users });
    // });

    // set({ socket: newSocket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
