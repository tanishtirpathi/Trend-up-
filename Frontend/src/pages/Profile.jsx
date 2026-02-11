import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export function Profile() {
  const { UpdatingProfile, UpdateProfile, authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  // Current user
  const user = authUser?? null;

  // Handle avatar upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Instant preview
    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await UpdateProfile(formData);
    } catch (error) {
      console.error("Avatar upload failed", error);
    }
  };

  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toDateString()
    : "N/A";

  const userIdLastDigits = user?._id?.slice(-6) || "------";

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-black via-neutral-950 to-black text-white">
      <Navbar />

      <div className="mx-auto flex max-w-2xl justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full mt-10 overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl shadow-2xl"
        >
          {/* Banner */}
          <div className="relative h-32 bg-gradient-to-r from-green-500/30 via-emerald-400/30 to-sky-500/30" />

          {/* Profile Header */}
          <div className="relative flex flex-col items-center gap-4 px-6 pb-6 sm:flex-row sm:items-end">
            {/* Avatar */}
            <div className="-mt-16 relative">
              <img
                src={selectedImage || user?.avatar || "/image.png"}
                alt="profile"
                className="h-32 w-32 rounded-full border-4 border-black object-cover shadow-xl"
              />

              <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-gradient-to-r from-green-400 to-sky-400 p-2 text-xs font-semibold text-black shadow-lg transition hover:scale-105">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                  disabled={UpdatingProfile}
                />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold tracking-tight">
                {user?.name || "Anonymous User"}
              </h2>
              <p className="mt-1 text-sm text-white/60">
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 px-6 py-4 sm:grid-cols-3">
            <div className="rounded-md bg-white/5 p-5 transition hover:bg-white/10">
              <p className="text-xs uppercase tracking-wide text-white/50">
                Account Created
              </p>
              <p className="mt-2 font-semibold">{createdDate}</p>
            </div>

            <div className="rounded-md bg-white/5 p-5 transition hover:bg-white/10">
              <p className="text-xs uppercase tracking-wide text-white/50">
                User ID
              </p>
              <p className="mt-2 font-semibold">****{userIdLastDigits}</p>
            </div>

            <div className="rounded-md bg-white/5 p-5 transition hover:bg-white/10">
              <p className="text-xs uppercase tracking-wide text-white/50">
                Status
              </p>
              <p className="mt-2 font-semibold text-green-400">Active</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-6 sm:flex-row sm:justify-end">
            <button className="rounded-xl border border-white/20 px-6 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5">
              Cancel
            </button>

            <motion.button
              disabled
              animate={{ opacity: UpdatingProfile ? 0.6 : 1 }}
              className={`rounded-xl px-6 py-2 text-sm font-semibold transition
                ${
                  UpdatingProfile
                    ? "bg-yellow-400/20 text-yellow-300"
                    : "bg-green-400/20 text-green-400"
                }
              `}
            >
              {UpdatingProfile ? "Uploading..." : "Auto Saved"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
