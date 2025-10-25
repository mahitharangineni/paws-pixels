export default function RawImageSection({
  photos,
  selectedIds,
  onToggleOne,
  onToggleAll,
  onProcess,
}) {
  const allSelected = photos.length > 0 && selectedIds.size === photos.length;

  return (
    <section className="bg-white rounded-2xl shadow p-6">
      {/* Updated heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          📸 Gallery
        </h2>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleAll}
              className="size-4 accent-indigo-600"
            />
            Select All
          </label>

          {/* changed button text */}
          <button
            onClick={onProcess}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
            disabled={selectedIds.size === 0}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Image grid (no names) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photos.map((p) => {
          const checked = selectedIds.has(p.id);
          return (
            <div
              key={p.id}
              className="relative bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-md transition"
            >
              <img
                src={p.url}
                alt=""
                className="w-full h-52 object-cover transform hover:scale-105 transition duration-300"

              />
              <div className="absolute top-3 left-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleOne(p.id)}
                  className="size-5 accent-indigo-600"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
