"use client";
import Image from "next/image"; // 👈 REQUIRED
import SearchIcon from "@/public/search.png";
import { useState } from "react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false); // close dropdown
  };
  return (
    <div className="border border-gray-300 rounded-lg p-4 m-10 w-[1220px] bg-white">
      <form action="/" method="GET" className="flex items-center">
        <button type="submit" className="">
          <Image src={SearchIcon} alt="Search" width={20} height={20} />
        </button>
        <input
          type="search"
          placeholder="Search task ..."
          className="w-5xl text-[#202125] outline-none ml-2 pl-1"
        />
        <div className="flex items-center">
          {/* Divider */}
          <div className="bg-gray-600 h-6 w-px mx-4"></div>

          {/* Dropdown container */}
          <div className="relative">
            {/* Button */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 text-black cursor-pointer"
            >
              {selected}
              <span>▼</span>
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg p-2 shadow-lg w-32">
                <button
                  className="block text-left w-full px-2 py-1 text-[#202125] hover:bg-gray-100"
                  onClick={() => handleSelect("All")}
                >
                  All
                </button>

                <button
                  className="block text-left w-full px-2 py-1 text-[#202125] hover:bg-gray-100"
                  onClick={() => handleSelect("Completed")}
                >
                  Completed
                </button>

                <button
                  className="block text-left w-full px-2 py-1 text-[#202125] hover:bg-gray-100"
                  onClick={() => handleSelect("Pending")}
                >
                  Pending
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
