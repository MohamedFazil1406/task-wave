// app/(whatever)/layout.tsx  (or app/layout.tsx)
import ProfileAvatar from "@/app/components/ProfileAvatar";
import "../../../app/globals.css"; // adjust path if this file is in a nested folder
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-[#0f1720]">
        {" "}
        {/* global bg on body */}
        <header className="bg-[#18212c] flex justify-between items-center px-4 py-3">
          <div className="font-extrabold text-white text-2xl">TaskWave</div>

          <Link href="/Addtask">
            <button className="bg-blue-500 px-3 py-1 rounded text-white">
              + Add Task
            </button>
          </Link>
          <ProfileAvatar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
