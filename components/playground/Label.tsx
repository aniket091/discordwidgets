import { ReactNode } from "react";

interface LabelProps {
  icon: ReactNode;
  children: ReactNode;
}

export function Label({ icon, children }: LabelProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {icon}
      <span>{children}</span>
    </div>
  );
}