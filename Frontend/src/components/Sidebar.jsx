import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState, useMemo } from "react";

function Sidebar() {
  const { getUser, isUserLoading, selectedUser, setSelectedUser, users } =
    useChatStore();

  const { onlineUser = [] } = useAuthStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUser();
  }, [getUser]);

  // ✅ MOVE useMemo ABOVE conditional return
  const filteredUsers = useMemo(() => {
    return users?.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // ✅ NOW safe to return conditionally
  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <div className="h-full w-full flex flex-col bg-black/60 backdrop-blur-xl border-r border-white/10">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        {/* Search */}
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-white placeholder:text-white/40 w-full"
          />
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        {filteredUsers?.length === 0 && (
          <p className="text-center text-white/40 text-sm mt-6">
            No users found
          </p>
        )}

        {filteredUsers?.map((user) => {
          const isSelected = selectedUser?._id === user._id;

          return (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
                ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"
                    : "hover:bg-white/5"
                }`}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar || "/image.png"}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />

                {/* Online Dot */}
                <span
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-black ${
                    onlineUser.includes(user._id)
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-white/50 truncate">
                  {onlineUser.includes(user._id) ? "online" : "offline"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
