export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md">

      <div className="flex flex-col items-center gap-6">

        {/* Spinner */}
        <div className="relative w-16 h-16">

          <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>

          <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spinSlow"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulseSoft"></div>
          </div>

        </div>

        {/* Text */}
        <p className="text-gray-700 font-medium animate-pulseSoft">
          Loading medicines...
        </p>

        {/* Progress bar */}
        <div className="w-44 h-2 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-orange-500/20"></div>
          <div className="absolute inset-0 w-1/2 bg-orange-500/60 animate-shimmer"></div>
        </div>

      </div>
    </div>
  );
}