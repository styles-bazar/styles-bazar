export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] text-white">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 animate-pulse rounded-full bg-orange-500/10 blur-[120px]" />
      
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 animate-pulse rounded-full bg-orange-500/10 blur-[120px]" />

      {/* Loading Content */}
      <div className="relative flex flex-col items-center">

        {/* Logo Circle */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-orange-500/20 bg-orange-500/10 shadow-[0_0_60px_rgba(249,115,22,0.15)]">
          
          {/* Outer Ring */}
          <div className="absolute inset-[-7px] animate-spin rounded-[32px] border-2 border-transparent border-t-orange-500 border-r-orange-500/30" />

          {/* Inner Ring */}
          <div className="absolute inset-[7px] animate-[spin_1.5s_linear_infinite_reverse] rounded-[22px] border border-transparent border-b-orange-400/60" />

          {/* S */}
          <span className="text-4xl font-black text-orange-500">
            S
          </span>
        </div>

        {/* Store Name */}
        <div className="mt-7 overflow-hidden text-center">
          <h1 className="animate-[fadeIn_1s_ease-in-out_infinite_alternate] text-3xl font-black tracking-tight">
            Styles <span className="text-orange-500">Bazar</span>
          </h1>

          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-600">
            Your Style. Your Store.
          </p>
        </div>

        {/* Loading Dots */}
        <div className="mt-7 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500" />
        </div>

      </div>
    </main>
  );
}