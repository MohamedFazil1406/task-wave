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
      <body>{children}</body>
    </html>
  );
}
