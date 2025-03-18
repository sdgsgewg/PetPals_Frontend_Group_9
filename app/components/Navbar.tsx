"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Home, PawPrint, Menu, X, Heart, MapPin, Users } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 bg-blue-100 shadow-md z-50">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/img/logo.png" alt="logo" width={120} height={120} />
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6 text-slate-600 text-md">
          <Link href="/" className="flex items-center gap-2 hover:text-slate-800 transition">
            <Home size={18} />
            Home
          </Link>
          <Link href="/pets" className="flex items-center gap-2 hover:text-slate-800 transition">
            <PawPrint size={18} />
            Pets
          </Link>
          <Link href="/adopt" className="flex items-center gap-2 hover:text-slate-800 transition">
            <Heart size={18} />
            Adopsi
          </Link>
          <Link href="/services" className="flex items-center gap-2 hover:text-slate-800 transition">
            <MapPin size={18} />
            Jasa Hewan
          </Link>
          <Link href="/forum" className="flex items-center gap-2 hover:text-slate-800 transition">
            <Users size={18} />
            Forum
          </Link>
        </div>

        {/* Burger Menu Button (MD ke bawah) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black focus:outline-none cursor-pointer">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-blue-100 text-slate-600 rounded-md shadow-md p-4 space-y-4">
          <Link href="/" className="flex items-center gap-2 hover:text-slate-800 transition" onClick={() => setIsOpen(false)}>
            <Home size={18} />
            Home
          </Link>
          <Link href="/pets" className="flex items-center gap-2 hover:text-slate-800 transition" onClick={() => setIsOpen(false)}>
            <PawPrint size={18} />
            Pets
          </Link>
          <Link href="/adopt" className="flex items-center gap-2 hover:text-slate-800 transition" onClick={() => setIsOpen(false)}>
            <Heart size={18} />
            Adopsi
          </Link>
          <Link href="/services" className="flex items-center gap-2 hover:text-slate-800 transition" onClick={() => setIsOpen(false)}>
            <MapPin size={18} />
            Jasa Hewan
          </Link>
          <Link href="/forum" className="flex items-center gap-2 hover:text-slate-800 transition" onClick={() => setIsOpen(false)}>
            <Users size={18} />
            Forum
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
