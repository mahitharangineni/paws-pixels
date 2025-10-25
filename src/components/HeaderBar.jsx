import { exportProcessedCSV } from "../utils/exportCSV";
export default function HeaderBar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
      {/* Left: Logo + Text */}
      <div className="flex items-center gap-2">
        <img
          src="/images/paw_logo.png"      // 👈 your logo file should be in public/images/paw_logo.png
          alt="Paws & Pixels Logo"
          className="w-11 h-11 object-contain"
        />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Paws <span className="text-black">&</span> Pixels
        </h1>
      </div>

      {/* Right: Export CSV + Profile */}
      <div className="flex items-center gap-4">
        {/* Export CSV button */}
        <button
  onClick={() => exportProcessedCSV(window.latestProcessed || [])}
  className="px-4 py-2 bg-[#1A73E8] text-white font-medium rounded-lg hover:bg-blue-700 transition"
>
  Export CSV
</button>


        {/* Profile icon (grey circle with filled silhouette) */}
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#5f6368"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
    </header>
  );
}
