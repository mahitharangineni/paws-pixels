export default function HeaderBar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-10">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐾</span>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Paws & Pixels</h1>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Export CSV
        </button>
        <button
          className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden"
          title="Profile"
        >
          <img
            src="https://i.pravatar.cc/60?img=12"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
