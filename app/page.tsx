"use client";

import { useState, useEffect, useMemo } from "react";
import {  Sparkles, Settings2, Check, Type, Layout, Image as ImageIcon, Palette, ClipboardList, Tag } from "lucide-react";

// Components
import { Skeleton } from "@/components/playground/Skeleton";
import { SnippetBox } from "@/components/playground/SnippetBox";
import { StyleCard } from "@/components/playground/StyleCard";
import { ToggleCard } from "@/components/playground/ToggleCard";
import { ThemeSelector } from "@/components/playground/ThemeSelector";
import { PreviewImage } from "@/components/playground/PreviewImage";
import { Label } from "@/components/playground/Label";
import { useDebounce } from "@/utils/debounce";


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [code, setCode] = useState("discord-developers");
  const debouncedCode = useDebounce(code, 600);

  const [style, setStyle] = useState<"current" | "legacy">("current");
  const [cardTheme, setCardTheme] = useState("dark");
  const [animate, setAnimate] = useState(true);
  const [hideTag, setHideTag] = useState(false);
  const [useBanner, setUseBanner] = useState(true);
  useEffect(() => setMounted(true), []);

  const apiUrl = useMemo(() => {
    if (!mounted) return "";
    const baseUrl = window.location.origin;
    const cleanCode = debouncedCode.trim() || "discord-developers";
    const params = new URLSearchParams();

    params.set("theme", cardTheme);
    if (!animate) params.set("animate", "false");

    if (style === "legacy") {
      params.set("style", "legacy");
      if (!useBanner) params.set("usebanner", "false");
    } else {
      if (hideTag) params.set("hidetag", "true");
    }

    return `${baseUrl}/widgets/invite/${cleanCode}?${params.toString()}`;
  }, [mounted, debouncedCode, cardTheme, animate, style, useBanner, hideTag]);
  if (!mounted) return <Skeleton />;

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300 flex flex-col pt-16">
      <main className="flex-1 w-full p-6 lg:p-8 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
        <div className="mx-auto max-w-7xl h-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left Column */}
            <div className="col-span-1 lg:col-span-6 h-full flex flex-col rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
                  
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Configuration</h2>
                  <p className="text-base text-muted-foreground mt-1">Customize your invite card.</p>
                </div>

                <div className="space-y-8">
                  {/* Input */}
                  <div className="space-y-3">
                    <Label icon={<Type size={14} />}>Server Invite Code</Label>
                    <div className="group flex items-center rounded-xl border border-input bg-accent/50 px-4 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                      <span className="text-muted-foreground font-mono text-sm whitespace-nowrap py-4 select-none">
                        discord.gg/
                      </span>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) =>
                          setCode(
                            e.target.value.replace(/^(https?:\/\/)?(www\.)?(discord\.(gg|com\/invite)\/)/, "")
                          )
                        }
                        className="flex-1 bg-transparent py-4 pl-0.5 text-sm font-medium font-mono focus:outline-none placeholder:text-muted-foreground/50"
                        placeholder="discord-developers"
                      />
                      {code && isValid && (
                        <Check className="text-emerald-500 ml-2 sm:mr-2 w-5 h-5 shrink-0 animate-in zoom-in" />
                      )}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Layout Style */}
                  <div className="space-y-3">
                    <Label icon={<Layout size={14} />}>Layout Style</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <StyleCard
                        active={style === "current"}
                        onClick={() => setStyle("current")}
                        title="Current"
                      />
                      <StyleCard
                        active={style === "legacy"}
                        onClick={() => setStyle("legacy")}
                        title="Legacy"
                      />
                    </div>
                  </div>

                  {/* Theme Selector */}
                  <div className="space-y-3">
                    <Label icon={<Palette size={14} />}>Color Theme</Label>
                    <ThemeSelector
                      current={cardTheme}
                      onChange={setCardTheme}
                      style={style}
                    />
                  </div>

                  {/* Settings Toggles */}
                  <div className="space-y-3">
                    <Label icon={<Settings2 size={14} />}>Settings</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <ToggleCard
                        label="Animations"
                        desc="Enable animated icons & banners"
                        checked={animate}
                        onChange={setAnimate}
                        icon={<Sparkles size={18} className="text-amber-500" />}
                      />
                      {style === "current" ? (
                        <ToggleCard
                          label="Hide Guild Tag"
                          desc="Hide the Guild Tag (if present)"
                          checked={hideTag}
                          onChange={setHideTag}
                          icon={<Tag size={18} className="text-blue-500" />}
                        />
                      ) : (
                        <ToggleCard
                          label="Use Banner"
                          desc="Use the banner image instead of the splash (if available)"
                          checked={useBanner}
                          onChange={setUseBanner}
                          icon={<ImageIcon size={18} className="text-purple-500" />}
                        />
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 lg:col-span-6 h-full flex flex-col gap-6">
              {/* PREVIEW CARD */}
              <div className="flex-1 rounded-3xl border border-border bg-card shadow-sm overflow-hidden flex flex-col min-h-100">
                <div className="border-b border-border px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-accent/30">
                  Live Preview
                </div>

                <div className="flex-1 relative flex items-center justify-center p-10 bg-accent/10 overflow-hidden">
                  <div 
                    className="absolute inset-0 pointer-events-none text-slate-500"
                    style={{
                      backgroundImage: `radial-gradient(currentColor 1.5px, transparent 1.5px)`,
                      backgroundSize: '24px 24px',
                      opacity: 0.3
                    }}
                  />

                  <div className="relative z-10 w-full flex justify-center">
                    <div className="group relative transition-transform duration-300 hover:scale-[1.01]">
                      <PreviewImage 
                        src={apiUrl} 
                        alt="Discord Invite Preview" 
                        hasCode={!!code.trim()}
                        onStatusChange={(status) => setIsValid(status)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* USAGE CARD */}
              <div className="rounded-3xl border border-border bg-card shadow-sm p-6 lg:p-8">
                <div className="mb-6 flex items-center gap-2">
                  <ClipboardList size={16} className="text-muted-foreground" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Usage
                  </h3>
                </div>

                <div className="space-y-4">
                  <SnippetBox label="Markdown" text={`![Invite](${apiUrl})`} />
                  <SnippetBox label="HTML" text={`<img src="${apiUrl}" alt="Invite" />`} />
                  <SnippetBox label="Direct Link" text={apiUrl} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}