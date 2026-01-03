import { useAuthStore } from "../store/useAuthStore";
import { MagicCard } from "../components/ui/magic-card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export function Signup() {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const { signUp, isSigningUp, error } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4">
      <MagicCard className="relative w-full max-w-md p-[1px] rounded-2xl">
        {/* Inner Glass */}
        <div className="w-full rounded-2xl bg-black/80 backdrop-blur-xl px-7 py-8 space-y-6 border border-white/10">
          {/* Profile Upload */}
          <div className="flex justify-center">
            <label className="relative cursor-pointer group">
              <input
                type="file"
                value={formData.avatar}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="h-24 w-24 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden bg-white/5 transition-all group-hover:border-green-500 group-hover:bg-green-500/10">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-zinc-400 text-center leading-tight">
                    Upload
                    <br />
                    Photo
                  </span>
                )}
              </div>
            </label>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Create your <span className="text-green-500">TrendUp</span>{" "}
              account
            </h2>
            <p className="text-sm text-zinc-400">
              One step closer to seamless video & chat experience
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-zinc-400">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Tony Stark"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@trendup.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-zinc-400">
                Password
              </label>
              <input
                value={formData.password}
                type="password"
                placeholder="Create a strong password"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* CTA */}
            <button
              disabled={isSigningUp}
              type="submit"
              className=" flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 py-2.5 text-sm font-semibold text-black transition-all hover:brightness-110 active:scale-[0.98]"
            >
              {isSigningUp ? (
                <Loader className="text-white size-8" />
              ) : (
                "Create Accounts"
              )}
            </button>
          </form>
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </div>
          )}
          {/* Footer */}
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-green-500 hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>
      </MagicCard>
    </div>
  );
}
