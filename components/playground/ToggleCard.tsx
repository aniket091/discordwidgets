import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ToggleCardProps {
  label: string;
  desc: string;
  checked: boolean;
  icon: ReactNode;
  onChange: (checked: boolean) => void;
}

export function ToggleCard({ label, desc, checked, icon, onChange }: ToggleCardProps) {
  return (
    <div 
      onClick={() => onChange(!checked)}
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-200 select-none",
        checked 
          ? "border-primary/80 bg-primary/10 shadow-sm shadow-primary/20" 
          : "border-border bg-transparent hover:border-border-hover hover:bg-accent/50 hover:shadow-sm shadow-accent/20"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
          checked 
            ? "bg-primary/10 text-primary" 
            : "bg-hover-layer text-muted-foreground"
        )}>
          {icon}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground leading-tight">
            {label}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5">
            {desc}
          </span>
        </div>
      </div>

      <div className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-all duration-300 ease-in-out group-hover:scale-105",
        checked ? "bg-primary" : "bg-muted-foreground/40"
      )}>
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out mt-0.5 ml-0.5",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
    </div>
  );
}