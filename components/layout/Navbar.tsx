"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Github, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
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
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white shadow-sm shadow-primary/20 transition-transform duration-200 group-hover/logo:scale-105">
            <NavbarIcon width={20} height={20} fill="currentColor" />
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


function NavbarIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className={className}
      {...props}
    >
      <path d="M23.61,10.836l-1.718-3.592c-.218-.455-.742-.678-1.219-.517l-8.677,2.896L3.307,6.728c-.477-.159-1.001,.062-1.219,.518L.436,10.719c-.477,.792-.567,1.743-.247,2.609,.31,.84,.964,1.491,1.801,1.795l-.006,2.315c0,2.157,1.373,4.065,3.419,4.747l4.365,1.456c.714,.237,1.464,.356,2.214,.356s1.5-.119,2.214-.357l4.369-1.456c2.044-.682,3.418-2.586,3.419-4.738l.006-2.322c.846-.296,1.508-.945,1.819-1.788,.316-.858,.228-1.8-.198-2.5Zm-21.416,.83l1.318-2.763,7.065,2.354-1.62,3.256c-.242,.406-.729,.584-1.174,.436l-5.081-1.695c-.298-.099-.53-.324-.639-.618-.108-.293-.078-.616,.13-.97Zm3.842,8.623c-1.228-.41-2.053-1.555-2.052-2.848l.004-1.65,3.164,1.055c1.346,.446,2.793-.09,3.559-1.372l.277-.555-.004,6.979c-.197-.04-.391-.091-.582-.154l-4.365-1.455Zm11.896-.002l-4.369,1.456c-.19,.063-.384,.115-.58,.155l.004-6.995,.319,.64c.557,.928,1.532,1.46,2.562,1.46,.318,0,.643-.051,.96-.157l3.16-1.053-.004,1.651c0,1.292-.825,2.435-2.052,2.844Zm4-7.645c-.105,.285-.331,.504-.619,.601l-5.118,1.705c-.438,.147-.935-.036-1.136-.365l-1.654-3.322,7.064-2.357,1.382,2.88c.156,.261,.187,.574,.081,.859ZM5.214,5.896c-.391-.391-.391-1.023,0-1.414L9.111,.586c.779-.779,2.049-.779,2.828,0l1.596,1.596c.753-.385,1.738-.27,2.353,.345l2.255,2.255c.391,.391,.391,1.023,0,1.414s-1.023,.391-1.414,0l-2.255-2.255-3.151,3.151c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.147-2.147-1.53-1.53-3.897,3.896c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293Z" />
    </svg>
  );
}