"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemPrefersDark(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
        {systemPrefersDark ? (
          <Sun className="text-yellow-500" />
        ) : (
          <Moon className="text-gray-400" />
        )}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="text-yellow-500" />
        ) : (
          <Moon className="text-gray-400" />
        )}
      </button>
    </>
  );
};

export default ThemeSwitcher;
