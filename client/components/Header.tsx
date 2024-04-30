'use client';
import { setUserID } from "@/utils/utilFuncitons";

export default function Header() {
  return <div className="flex mb-4 gap-12 p-4 border-b bg-slate-950">
    <div className="flex items-center ml-4">
      <h1 className="text-2xl font-bold text-white">PogChamp Market</h1>
    </div>
    <nav className="flex items-center gap-4">
      <a href="/" className="text-white">Home</a>
      <a href="/admin" className="text-white">Admin Panel</a>
      <a href={`/user/${setUserID}`} className="text-white">Owned Pogs</a>
    </nav>
  </div>
}