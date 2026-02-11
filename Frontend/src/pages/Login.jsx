import { useState } from "react";
import { MagicCard } from "../components/ui/magic-card";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isLoggingUp, login, error } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4">
      <MagicCard className="relative w-full max-w-md p-[1px] rounded-2xl">
        {/* Inner Glass Layer */}
        <div className="w-full rounded-2xl bg-black/80 backdrop-blur-xl p-8 space-y-7">
          {/* Branding */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-wide text-white">
              Trend<span className="text-blue-400">Up</span>
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Welcome back. Log in to stay ahead of the trend.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-widest text-zinc-400"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@trendup.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-widest text-zinc-400"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your secure password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                {error}
              </div>
            )}
            {/* Button */}
            <button
              disabled={isLoggingUp}
              type="submit"
              className="w-full rounded-lg bg-blue-300 py-3 text-sm font-semibold text-white tracking-wide transition-all hover:bg-blue-400 active:scale-[0.97]"
            >
              {isLoggingUp ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-zinc-400">
            New to TrendUp?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-blue-400 hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </MagicCard>
    </div>
  );
}
