"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaAdjust } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <FaAdjust className="absolute h-10 w-10 scale-100"></FaAdjust>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FaSun className="absolute h-10 w-10 rotate-90 scale-0 dark:-rotate-0 dark:scale-100"></FaSun>
      <FaMoon className="absolute h-10 w-10 rotate-0 scale-100 dark:-rotate-90 dark:scale-0"></FaMoon>
    </Button>
  );
};

export default ThemeSwitcher;
