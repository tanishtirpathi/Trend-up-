import { useState } from "react";
import { MagicCard } from "../components/ui/magic-card";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const BaseUrl =" http://localhost:4000"
  const { isLoggingUp, login, error, checkAuth } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen w-screen bg-[#EDEADE] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white border border-[#E5E5E5] rounded-2xl p-8 sm:p-10">
        {/* Branding */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-wide text-[#111111]">
            Login
          </h2>
          <p className="mt-3 text-sm text-[#6B6B6B]">
            Access your private session.
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-widest text-[#6B6B6B]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-widest text-[#6B6B6B]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoggingUp}
            className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
          >
            {isLoggingUp ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#6B6B6B]">
          No account?{" "}
          <button onClick={() => navigate("/signup")} className="text-white ">
            Create one
          </button>
        </div>
        <div className="p-1">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            await axios.post(
              `${BaseUrl}/api/auth/google`,
              { token: credentialResponse.credential },
              { withCredentials: true },
            );
            await checkAuth();
            navigate("/chat");
          }}
          onError={() => {
            console.log("Google login failed");
          }}
        /></div>
      </div>
    </div>
  );
}
