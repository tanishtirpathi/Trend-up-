import React from "react";

function SidebarSkeleton() {
  return (
    <div className="h-full w-full p-4 space-y-4 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="h-10 rounded-xl bg-white/10" />

      {/* Chat List Skeleton */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
        >
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-white/10" />

          {/* Text */}
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 rounded bg-white/10" />
            <div className="h-2 w-1/2 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SidebarSkeleton;
