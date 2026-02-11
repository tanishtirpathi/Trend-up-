import { motion } from "framer-motion";
import { MessageSquareLock, Lock, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-screen bg-black text-white overflow-hidden">
      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 h-[480px] w-[480px] bg-purple-500/30 blur-[160px]" />
        <div className="absolute bottom-20 right-20 h-[360px] w-[360px] bg-blue-500/30 blur-[160px]" />
      </div>

      {/* 🧠 Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Trend Up
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-white/70"
        >
          A next-gen anonymous video calling & chatting platform.
          <br />
          No profiles. No identity. Just real conversations.
        </motion.p>

        {/* 🚀 CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex gap-4 flex-wrap justify-center"
        >
          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3 rounded-2xl bg-white text-white font-semibold hover:scale-105 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 font-semibold hover:scale-105 transition"
          >
            Get Started
          </button>
        </motion.div>
      </div>

      {/* ✨ Feature Cards */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {[{
          icon: <Globe size={28} />,
          title: "Global Reach",
          desc: "Talk to people from anywhere in the world instantly."
        },{
          icon: <Lock size={28} />,
          title: "100% Anonymous",
          desc: "No identity revealed. Your privacy is our priority."
        },{
          icon: <MessageSquareLock size={28} />,
          title: "Real-Time chatting",
          desc: "chat delete after some minute of chatting "
        }].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur hover:bg-white/10 transition"
          >
            <div className="mb-4 text-green-400">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-white/70 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
