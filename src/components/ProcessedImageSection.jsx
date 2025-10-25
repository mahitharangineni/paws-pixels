import { useState } from "react";

export default function ProcessedImageSection({ processed }) {
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");

  // Collect unique labels and moods from results
  const allLabels = Array.from(new Set(processed.flatMap((p) => p.labels || [])));
  const allMoods = Array.from(new Set(processed.flatMap((p) => p.moods || [])));

  // Count how many filters are active
  const filtersApplied =
    (selectedLabel !== "All" ? 1 : 0) + (selectedMood !== "All" ? 1 : 0);

  // Filter logic
  const filtered = processed.filter((p) => {
    const matchesLabel =
      selectedLabel === "All" || (p.labels || []).includes(selectedLabel);
    const matchesMood =
      selectedMood === "All" || (p.moods || []).includes(selectedMood);
    return matchesLabel && matchesMood;
  });

  // Reset filters
  const clearFilters = () => {
    setSelectedLabel("All");
    setSelectedMood("All");
  };

  if (processed.length === 0)
    return (
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
          🪄 Generated Results
        </h2>
        <p className="text-gray-500 text-sm">
          No generated captions yet — select photos above and click{" "}
          <b>Generate</b>.
        </p>
      </section>
    );

  return (
    <section className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        🪄 Generated Results
      </h2>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {/* Label filter */}
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="All">All Labels</option>
          {allLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        {/* Mood filter */}
        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="All">All Moods</option>
          {allMoods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>

        {/* Blue Clear Filters button */}
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-[#1A73E8] text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Clear Filters
        </button>

        {/* Filters Applied Counter */}
        {filtersApplied > 0 && (
          <span className="text-sm text-gray-600 font-medium">
            Filters applied: {filtersApplied}
          </span>
        )}
      </div>

      {/* No matches */}
      {filtered.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">
          No results match the selected filters.
        </p>
      )}

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-md transition"
          >
            <img
              src={p.url}
              alt=""
              className="w-full h-52 object-cover transform hover:scale-105 transition duration-300"
            />
            <div className="p-3 space-y-1 text-sm">
              <p className="font-semibold text-gray-800">
                {p.caption || "Caption not generated"}
              </p>
              <p className="text-gray-600">
                <b>Labels:</b> {(p.labels || []).join(", ")}
              </p>
              <p className="text-gray-600">
                <b>Moods:</b> {(p.moods || []).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
