import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState, useMemo } from "react";

function Sidebar() {
  const {
    getUser,
    isUserLoading,
    selectedUser,
    setSelectedUser,
    users,
    unreadCounts,
  } = useChatStore();

  const { onlineUser = [] } = useAuthStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUser();
  }, [getUser]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );

    filtered.sort((a, b) => {
      const aOnline = onlineUser.includes(a._id);
      const bOnline = onlineUser.includes(b._id);
      if (aOnline === bOnline) return 0;
      return aOnline ? -1 : 1;
    });

    return filtered;
  }, [users, search, onlineUser]);

  if (isUserLoading) return <SidebarSkeleton />;

  //two days thing add
  const TWO_DAYS_MS = 48 * 60 * 60 * 1000;
  function isUserNew(createdAt) {
    if (!createdAt) return false;
    return Date.now() - new Date(createdAt).getTime() <= TWO_DAYS_MS;
  }
  return (
    <div className="h-full w-full flex flex-col bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/10 border border-slate-200">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-slate-700 font-serif placeholder:text-slate-400 w-full"
          />
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredUsers?.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-6 font-serif">
            No users found
          </p>
        )}

        {filteredUsers?.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const unread = unreadCounts?.[user._id] || 0;
          const isOnline = onlineUser.includes(user._id);
          const isNew = isUserNew(user.createdAt);
          return (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                isSelected
                  ? "bg-white border border-slate-200 shadow-sm"
                  : "hover:bg-white border border-transparent   "
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
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                    isOnline ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                />

                {/* Unread Badge */}
                {unread > 0 && !isSelected && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-semibold">
                    {unread}
                  </span>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-800 font-serif truncate">
                    {user.name}
                  </p>

                  {isNew && (
                    <span className="text-[10px] px-2 py-[2px] bg-blue-500 text-white rounded-full font-semibold">
                      NEW
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 truncate">
                  {isOnline ? "online" : "offline"}
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
