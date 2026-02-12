import { motion } from "framer-motion";
import { Shield, TimerReset, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {Ripple } from "../components/ui/ripple"
export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-[#FAF9F6] text-[#111111]">

      {/* Top Bar */}
      <div className="flex justify-between items-center px-10 py-8 max-w-6xl mx-auto">
        <h1 className="text-lg tracking-wide font-bold">
          Trend-up
        </h1>

        <div className="flex gap-6 text-sm text-[#6B6B6B]">
          <button onClick={() => navigate("/login")} className="hover:text-white transition">
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 border border-[#111111] rounded-full hover:bg-black hover:text-white transition"
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 mt-20 text-center max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-xl md:text-6xl font-serif leading-tight tracking-tight"
        >
        <span className="text-2xl">  Conversations That</span>
          <br />
          Don’t Exist Tomorrow.
        </motion.h2>
  <Ripple />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg text-[#6B6B6B] max-w-2xl mx-auto"
        >
          End-to-end encrypted messaging with automatic deletion
          after 15 minutes. No history. No archives. No recovery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 rounded-full bg-[#111111] text-white text-base tracking-wide hover:opacity-90 transition"
          >
            Start Secure Chat
          </button>
        </motion.div>
      </div>

      {/* Divider Line */}
      <div className="mt-24 border-t border-[#E4E4E4]" />

      {/* Feature Section */}
      <div className="px-6 py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {[
          {
            icon: <Shield size={24} />,
            title: "Encrypted by Default",
            desc: "Every message is encrypted before it leaves your device."
          },
          {
            icon: <TimerReset size={24} />,
            title: "15-Minute Lifespan",
            desc: "All conversations are permanently deleted after 15 minutes."
          },
          {
            icon: <Lock size={24} />,
            title: "Zero Retention Policy",
            desc: "No stored history. No backups. No server archives."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="w-10 h-10 flex items-center justify-center border border-[#111111] rounded-full">
              {item.icon}
            </div>

            <h3 className="text-lg font-medium">
              {item.title}
            </h3>

            <p className="text-[#6B6B6B] text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Subtle Bottom Statement */}
      <div className="text-center pb-16 text-xs tracking-widest text-[#6B6B6B]">
        BUILT FOR PRIVACY · DESIGNED FOR DISAPPEARANCE
      </div>

    </div>
  );
}
