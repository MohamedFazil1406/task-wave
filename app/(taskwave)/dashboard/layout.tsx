import ProfileAvatar from "@/app/components/ProfileAvatar";
import "../../../app/globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col bg-[#0f1720]">
        {/* Header */}
        <header className="bg-[#18212c] flex justify-between items-center px-4 py-3">
          <div className="font-extrabold text-white text-2xl">TaskWave</div>

          <Link href="/Addtask">
            <button className="bg-blue-500 px-3 py-1 rounded text-white">
              + Add Task
            </button>
          </Link>

          <ProfileAvatar />
        </header>

        {/* Main content */}
        <main className="flex-1 bg-white">{children}</main>
      </body>
    </html>
  );
}
