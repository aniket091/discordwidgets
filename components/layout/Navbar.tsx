"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Github, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";


export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-navbar-border bg-navbar/70 backdrop-blur-md" />
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-navbar-border bg-navbar/70 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        <Link href="/" className="flex items-center gap-2.5 group/logo">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden transition-transform duration-200 group-hover/logo:scale-105">
            <Image 
              src="/logo.png" 
              alt="Discord Widgets Logo" 
              width={80} 
              height={80}
              className="hidden h-full w-full object-contain dark:block"
            />
            <Image 
              src="/logolight.png" 
              alt="Discord Widgets Logo" 
              width={80} 
              height={80}
              className="block h-full w-full object-contain dark:hidden"
            />
          </div>

          <span className="text-xl font-bold tracking-tight text-navbar-foreground transition-colors group-hover/logo:text-foreground">
            Discord Widgets
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          
          <Link
            href="/github"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
              "border-navbar-border bg-transparent text-navbar-foreground hover:bg-accent"
            )}
          >
            <Github size={16} />
            <span className="hidden sm:inline">Star on GitHub</span>
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-3 w-px bg-border mx-1" />
              <Star size={12} className="group-hover:text-yellow-500 transition-colors" fill="currentColor" />
            </div>
          </Link>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "group flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ease-in-out",
              "border-navbar-border bg-transparent text-navbar-foreground hover:bg-accent"
            )}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun size={18} className="transition-transform duration-300 group-hover:rotate-90 group-active:scale-90" />
            ) : (
              <Moon size={18} className="transition-transform duration-300 group-hover:-rotate-30 group-active:scale-90" />
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}