import { useAuthStore } from "../store/useAuthStore";
import { MagicCard } from "../components/ui/magic-card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
export function Signup() {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const { signUp, isSigningUp, error, checkAuth } = useAuthStore();
  const BaseUrl = "http://localhost:4000";
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="min-h-screen w-screen bg-[#F7F7F6] flex items-center justify-center px-4">
      <MagicCard className="w-full max-w-sm">
        <div className="bg-white border border-[#E5E5E5] rounded-xl px-6 py-6 space-y-5">
          {/* Avatar */}
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                value={formData.avatar}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="h-16 w-16 rounded-full border border-[#DADADA] flex items-center justify-center overflow-hidden bg-[#FAFAFA] hover:border-black transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-[#6B6B6B] text-center">
                    Photo
                  </span>
                )}
              </div>
            </label>
          </div>

          {/* Header */}
          <div className="text-center space-y-1">
            <p className="text-xs text-[#6B6B6B]">
              Secure chat · Auto deletes in 15 min
            </p>{" "}
            <h2 className="text-4xl font-bold text-[#111]">Create Account</h2>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full rounded-md border border-[#E5E5E5] px-3 py-2 text-sm outline-none focus:border-black"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full rounded-md border border-[#E5E5E5] px-3 py-2 text-sm outline-none focus:border-black"
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full rounded-md border border-[#E5E5E5] px-3 py-2 text-sm outline-none focus:border-black"
            />

            {error && <div className="text-xs text-red-600">{error}</div>}

            <button
              disabled={isSigningUp}
              type="submit"
              className="w-full flex items-center justify-center rounded-md bg-black py-2 text-sm text-white hover:opacity-90 transition"
            >
              {isSigningUp ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#6B6B6B]">
            Already have account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-white px-5 py-2 bg-black rounded"
            >
              Sign in
            </span>
          </p>
          <div className="p-1">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                await axios.post(
                  `${BaseUrl}/api/auth/google`,
                  { token: credentialResponse.credential },
                  { withCredentials: true },
                );
                await checkAuth();
                navigate("/");
              }}
              onError={() => {
                console.log("Google login failed");
              }}
            />
          </div>
        </div>
      </MagicCard>
    </div>
  );
}
