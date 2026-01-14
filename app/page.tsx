'use client'
import Image from "next/image";
import NavMenu from "./components/NavMenu";
import LoginComponent from "./components/LoginComponent"
export default function Home() {
  return (
    <div>
    <nav className="flex items-center justify-center text-black mt-2">
      <NavMenu />
    </nav>
    <div className="min-h-screen flex items-center justify-center gap-6">
    <Image
      src="/logocanatu.png"
      width={300}
      height={300}
      alt="Site Login"
    />
    <LoginComponent />
    </div>
    </div>
  );
}
