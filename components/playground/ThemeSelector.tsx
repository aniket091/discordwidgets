import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  current: string;
  onChange: (v: string) => void;
  style: string;
}

const InviteThemes = {
  legacy: [
    { id: "light", color: "#F2F3F5", label: "Light" },
    { id: "dark", color: "#2F3136", label: "Dark" },
  ],
  current: [
    { id: "light", color: "#FFFFFF", label: "Light" },
    { id: "ash", color: "#393A41", label: "Ash" },
    { id: "dark", color: "#242429", label: "Dark" },
    { id: "onyx", color: "#131416", label: "Onyx" },
  ]
}

export function ThemeSelector({ current, onChange, style }: ThemeSelectorProps) {
  const themes = InviteThemes[style === "legacy" ? "legacy" : "current"] || [];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full">
      {themes.map((t) => {
        const isActive = current === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "group relative flex flex-col items-center justify-center gap-2 rounded-xl border py-3 w-full transition-all focus:outline-none h-24",
              isActive
                ? "border-primary/80 bg-primary/10 shadow-sm shadow-primary/20"
                : "border-border bg-transparent hover:border-border-hover hover:bg-accent/50 hover:shadow-sm shadow-accent/20"
            )}
          >
            <div
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-transform border-accent",
                isActive ? "scale-110" : "group-hover:scale-105"
              )}
              style={{ backgroundColor: t.color }}
            >
              {isActive && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary backdrop-blur-sm shadow-sm">
                  <Check size={10} strokeWidth={3} className="text-primary-foreground" />
                </div>
              )}
            </div>

            <span
              className={cn("text-sm font-bold", isActive ? "text-primary" : "text-foreground")}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}