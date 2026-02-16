import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";


export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground overflow-hidden p-6">
      <div 
        className="absolute inset-0 pointer-events-none text-foreground/20"
        style={{
          backgroundImage: `radial-gradient(currentColor 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
          opacity: 0.4
        }}
      />

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-xl shadow-shadow/5">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary animate-in zoom-in duration-500">
            <FileQuestion size={40} />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>

          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Return Home
          </Link>
          
        </div>
        
        <p className="mt-8 text-xs text-muted-foreground font-mono uppercase tracking-widest opacity-50">
          Error 404
        </p>
      </div>
    </div>
  );
}