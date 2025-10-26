export default function RawImageSection({
  photos,
  selectedIds,
  onToggleOne,
  onToggleAll,
  onProcess,
}) {
  const allSelected = selectedIds.size === photos.length && photos.length > 0;

  return (
    <section className="bg-white rounded-2xl shadow p-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          🐾 Photo Gallery
        </h2>

        <div className="flex gap-3">
          {/* Select All / Deselect All */}
          <button
            onClick={onToggleAll}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>

          {/* Generate Button */}
          <button
            onClick={onProcess}
            disabled={selectedIds.size === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedIds.size === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#1A73E8] hover:bg-blue-700 text-white"
            }`}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photos.map((p) => {
          const isSelected = selectedIds.has(p.id);

          return (
            <div
              key={p.id}
              onClick={() => onToggleOne(p.id)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden shadow hover:shadow-md transition transform hover:scale-105 ${
                isSelected ? "ring-4 ring-[#1A73E8]" : ""
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleOne(p.id)}
                className="absolute top-3 left-3 h-5 w-5 z-10 accent-[#1A73E8] cursor-pointer"
                onClick={(e) => e.stopPropagation()} // stops double toggle
              />

              {/* Image */}
              <img
                src={p.url}
                alt={p.name}
                className={`w-full h-52 object-cover transition duration-300 ${
                  isSelected ? "opacity-85" : "opacity-100"
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
