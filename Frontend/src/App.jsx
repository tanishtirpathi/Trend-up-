import { Login } from "./pages/Login";
import { Signup } from "./pages/SignUp";
import { HomePage } from "./pages/HomePage";
import { Chat } from "./pages/Chat";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Profile } from "./pages/Profile";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log("auth user : " , authUser)
 console.log(`online user avaliable : ${onlineUser}`)
  // useEffect(() => {
  //   if (authUser?._id) {
  //     connectSocket();
  //   }
  // }, [authUser?._id]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black/95">
        <Loader className="size-14 animate-spin text-white" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={!authUser ? <HomePage /> : <Navigate to="/chat" />}
      />
      <Route
        path="/signup"
        element={!authUser ? <Signup /> : <Navigate to="/chat" />}
      />
      <Route
        path="/login"
        element={!authUser ? <Login /> : <Navigate to="/chat" />}
      />
      <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/" />} />
      <Route
        path="/profile"
        element={authUser ? <Profile /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
