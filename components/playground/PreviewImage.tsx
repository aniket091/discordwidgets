"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle, ImageIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface PreviewImageProps {
  src: string;
  alt: string;
  hasCode: boolean;
  onStatusChange?: (isValid: boolean) => void;
}

export function PreviewImage({ src, alt, hasCode, onStatusChange }: PreviewImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    onStatusChange?.(false); 
  }, [src]);

  const handleSuccess = () => {
    setLoading(false);
    onStatusChange?.(true);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    onStatusChange?.(false);
  };

  return (
    <div className="relative w-full flex justify-center items-center min-h-25">

      {!error && !loading && (
        <div className={cn(
            "absolute -inset-4 rounded-xl blur-xl opacity-20 transition-opacity duration-500 bg-primary/30",
        )} />
      )}
      
      {loading && hasCode && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <Loader2 className="animate-spin text-primary" size={26} />
          </div>
        </div>
      )}

      {!hasCode ? (
        <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-foreground/80 bg-foreground/5 w-full">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/10">
            <ImageIcon size={26} className="text-foreground" />
          </div>
          <p className="text-base font-semibold text-foreground">No Invite Code</p>
          <p className="text-sm text-muted-foreground mt-1">
              Enter an Invite Code or Server ID to begin.
          </p>
        </div>
      ) : (error ? (
        <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-red-500/50 bg-red-500/5 w-full">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle size={26} className="text-red-500" />
          </div>
          <p className="text-base font-semibold text-red-500">Invalid Invite Code</p>
          <p className="text-sm text-muted-foreground mt-1">
            We couldn't find a server for this code.
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleSuccess}
          onError={handleError}
          className={cn(
            "relative rounded-md shadow-2xl transition-all duration-500",
            loading ? "opacity-0 scale-95" : "opacity-100 scale-100",
          )}
        />
      ))}
    </div>
  );
}