// app/layout.tsx
import "../../app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Wave",
  description: "Task management app built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-[#1a3571] p-5 min-h-screen">
        <header className="font-extrabold text-white text-4xl mb-6">
          TaskWave
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
