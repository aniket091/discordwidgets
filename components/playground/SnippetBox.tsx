"use client";

import { useState } from "react";
import { CodeXml, Copy, CopyCheck, LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface SnippetBoxProps {
  label: string;
  text: string;
  icon?: LucideIcon;
}

export function SnippetBox({ label, text, icon: Icon }: SnippetBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.left = "-9999px";
        textArea.style.position = "absolute";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="space-y-2">
      
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          {Icon ? <Icon size={14} /> : <CodeXml size={14} />}
          {label}
        </label>
        {copied && (
          <span className="text-xs font-medium text-emerald-500 animate-in fade-in slide-in-from-right-2">
            Copied!
          </span>
        )}
      </div>

      <div className="group relative flex items-stretch rounded-xl border border-input bg-accent/50 transition-colors hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 overflow-hidden">
        <code className="flex-1 font-mono text-sm text-foreground py-3 px-4 whitespace-pre-wrap break-all">
          {text}
        </code>
        
        <button
          onClick={handleCopy}
          className={cn(
            "flex shrink-0 items-center justify-center px-4 border-l border-input transition-all focus:outline-none cursor-pointer group-hover:border-primary/50",
            copied 
              ? "bg-emerald-500/10 text-emerald-500" 
              : "bg-transparent text-muted-foreground hover:text-foreground"
          )}
          title="Copy to clipboard"
        >
          {copied ? (
            <CopyCheck size={16} className="animate-in zoom-in spin-in-90 duration-300 group-hover:scale-110" />
          ) : (
            <Copy size={16} className="transition-transform duration-200 group-hover:scale-110" />
          )}
        </button>
      </div>

    </div>
  );
}