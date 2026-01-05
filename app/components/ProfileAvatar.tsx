"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/libs/firebaseClient";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

/* -------- Helper -------- */
function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ProfileAvatar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* 🔐 Listen to auth */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  /* ❌ Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  /* 🚪 Logout handler */
  const handleLogout = async () => {
    // 1. Firebase logout (client)
    await signOut(auth);

    // 2. Clear session cookie (server)
    await axios.post("/api/auth/logoutSession");

    // 3. Redirect
    redirect("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-600 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold">
            {getInitials(user.displayName)}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-[#1f2937] shadow-lg border border-gray-700 z-50">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm font-medium text-white">
              {user.displayName || "User"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
