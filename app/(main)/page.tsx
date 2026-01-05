"use client";

import GoogleSignInButton from "../components/GoogleSigninButton";

export default function HomePage() {
  return (
    <div className="bg-[#1a3571] h-screen flex flex-col justify-center items-center text-white gap-6">
      <div className="font-bold text-5xl">Welcome to the TaskWave</div>
      <div className="text-3xl">Sign in to manage your account</div>
      <div>
        <GoogleSignInButton />
      </div>
      <div className="text-xl">Powered By Fazil</div>
    </div>
  );
}
