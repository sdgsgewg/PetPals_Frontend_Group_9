"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const NavbarAuth = () => {
  return (
    <div className="fixed top-0 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 bg-white dark:bg-gray-800 shadow-md z-10 transition-colors duration-300">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/img/logo.png" alt="logo" width={120} height={120} />
        </Link>

        {/* Menu Desktop */}
        <div className="flex items-center text-slate-600 dark:text-gray-300 text-md">
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );
};

export default NavbarAuth;
