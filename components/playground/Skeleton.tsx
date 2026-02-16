export function Skeleton() {
  return (
    <div className="min-h-screen w-full bg-background pt-16">
      <main className="w-full p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="col-span-1 lg:col-span-6 h-150 rounded-3xl border border-border bg-card p-6 lg:p-8">
              <div className="space-y-6">
                <div className="h-8 w-1/3 bg-muted rounded-md animate-pulse" />
                  <div className="h-4 w-1/2 bg-muted/50 rounded-md animate-pulse" />
                  <div className="h-px bg-border my-6" />
                  <div className="space-y-4">
                  <div className="h-12 w-full bg-muted/30 rounded-xl animate-pulse" />
                  <div className="h-12 w-full bg-muted/30 rounded-xl animate-pulse" />
                  <div className="h-12 w-full bg-muted/30 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
              <div className="flex-1 min-h-100 rounded-3xl border border-border bg-card shadow-sm flex items-center justify-center p-10">
                <div className="w-full max-w-100 h-35 bg-muted/30 rounded-xl animate-pulse" />
              </div>

              <div className="h-48 rounded-3xl border border-border bg-card p-6">
                <div className="space-y-3">
                   <div className="h-8 w-full bg-muted/20 rounded-lg animate-pulse" />
                  <div className="h-8 w-full bg-muted/20 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}