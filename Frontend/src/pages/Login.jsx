import { MagicCard } from "../components/ui/magic-card";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/schema";

export function Login() {
  const navigate = useNavigate();

 // const BaseUrl = "https://trend-up-ipbl.onrender.com";
const BaseUrl = "https://localhost:4000";
  const { isLoggingUp, login, error, checkAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login(data);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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
              placeholder="you@example.com"
              {...register("email")}
              className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 text-sm outline-none transition focus:border-black"
            />

            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
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
              placeholder="Enter password"
              {...register("password")}
              className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 text-sm outline-none transition focus:border-black"
            />

            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Backend error */}
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
          <button onClick={() => navigate("/signup")} className="text-white">
            Create one
          </button>
        </div>

        <div className="p-1">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              await axios.post(
                `${BaseUrl}/api/auth/google`,
                { token: credentialResponse.credential },
                { withCredentials: true }
              );

              await checkAuth();
              navigate("/chat");
            }}
            onError={() => {
              console.log("Google login failed");
            }}
          />
        </div>

      </div>
    </div>
  );
}