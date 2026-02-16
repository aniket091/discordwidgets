import { cn } from "@/utils/cn";
import { LayoutDashboard } from "lucide-react";

interface StyleCardProps {
  active: boolean;
  onClick: () => void;
  title: string;
}

export function StyleCard({ active, onClick, title }: StyleCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-3 rounded-xl border px-4 py-3.5 transition-all relative overflow-hidden focus:outline-none group w-full",
        active
          ? "border-primary/80 bg-primary/10 shadow-sm shadow-primary/20"
          : "border-border bg-transparent hover:border-border-hover hover:bg-accent/50 hover:shadow-sm shadow-accent/20"
      )}
    >
      <div className={cn("transition-transform", active ? "text-primary" : "group-hover:scale-110 duration-200 text-foreground")}>
        <LayoutDashboard size={18} />
      </div>
      <span className={cn("transition-none text-base font-bold", active ? "text-primary" : "text-foreground")}>
        {title}
      </span>
    </button>
  );
}