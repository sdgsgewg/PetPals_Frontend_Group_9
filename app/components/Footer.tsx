import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-200 dark:bg-gray-800 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="container">
          <div className="w-full border-slate-700">
            <p className="font-medium text-sm text-slate-600 dark:text-slate-300 text-center mb-4">
              © Copyright 2025. All rights reserved.
            </p>
            <p className="font-medium text-xs text-slate-500 dark:text-slate-400 text-center">
              Made by{" "}
              <a
                href="https://www.instagram.com/jessen_/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary dark:text-white"
              >
                Jessen
              </a>
              {" & "}
              <a
                href="https://www.instagram.com/jessen_/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary dark:text-white"
              >
                Bryan Jonatan
              </a>
              , using{" "}
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 dark:text-white font-bold"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 dark:text-sky-400 font-bold"
              >
                Tailwind CSS
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
