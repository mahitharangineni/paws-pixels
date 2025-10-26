import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import RawImageSection from "../components/RawImageSection";
import ProcessedImageSection from "../components/ProcessedImageSection";

// 🧠 Auto-caption enhancer
// 🧠 Auto-caption enhancer — fixed mapping based on your exact image names
function analyzePhoto(p) {
  const name = String(p.url || "").toLowerCase();

  // 🐶 Golden Retriever
  if (name.includes("golden_retriever"))
    return {
      ...p,
      caption: "A playful moment captured perfectly in sunlight.",
      labels: ["dog", "outdoor", "happy"],
      moods: ["joyful", "curious"],
    };

  // 🐱 Cat Sleeping
  if (name.includes("cat_sleeping"))
    return {
      ...p,
      caption: "Serenity and warmth blend in this cozy frame.",
      labels: ["cat", "relaxed", "cozy"],
      moods: ["calm", "dreamy"],
    };

  // 🐰 Rabbit
  if (name.includes("rabbit_grass"))
    return {
      ...p,
      caption: "An adorable face that says a thousand stories.",
      labels: ["rabbit", "grass", "gentle"],
      moods: ["energetic", "playful"],
    };

  // 🐶 Puppy
  if (name.includes("puppy_smile"))
    return {
      ...p,
      caption: "Colors and curiosity come alive beautifully.",
      labels: ["dog", "puppy", "playful"],
      moods: ["soft", "friendly"],
    };

  // 🦜 Parrot
  if (name.includes("parrot_blue"))
    return {
      ...p,
      caption: "Energy, joy, and innocence frozen in time.",
      labels: ["parrot", "bird", "colorful"],
      moods: ["joyful", "curious"],
    };

  // 🌿 Default (fallback)
  return {
    ...p,
    caption: "A beautiful moment captured in natural light.",
    labels: ["photo"],
    moods: ["pleasant"],
  };
}



export default function Dashboard() {
  // 🖼️ Demo photo set
  const initialPhotos = [
    { id: "1", url: "/images/golden_retriever.jpg", name: "Golden Retriever" },
    { id: "2", url: "/images/cat_sleeping.jpg", name: "Cat Sleeping" },
    { id: "3", url: "/images/rabbit_grass.jpg", name: "Rabbit" },
    { id: "4", url: "/images/puppy_smile.jpg", name: "Puppy" },
    { id: "5", url: "/images/parrot_blue.jpg", name: "Parrot" },
  ];

  const [raw] = useState(initialPhotos);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [processed, setProcessed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddMore, setShowAddMore] = useState(false);

  // Toggle one photo
  const toggleOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Select all photos
  const toggleAll = () => {
    setSelectedIds((prev) =>
      prev.size === raw.length ? new Set() : new Set(raw.map((r) => r.id))
    );
  };

  // Generate captions
  const handleProcess = () => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    setTimeout(() => {
      const chosen = raw.filter((r) => selectedIds.has(r.id));
      const results = chosen.map(analyzePhoto);
      setProcessed(results);
      setSelectedIds(new Set());
      setLoading(false);
      setShowAddMore(true);
    }, 400);
  };

  // Add more (reset)
  const handleAddMore = () => {
    setProcessed([]);
    setShowAddMore(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <HeaderBar />

      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* SECTION 1 — Photo Gallery */}
        <RawImageSection
          photos={raw}
          selectedIds={selectedIds}
          onToggleOne={toggleOne}
          onToggleAll={toggleAll}
          onProcess={handleProcess}
          showAddMore={showAddMore}
          onAddMore={handleAddMore}
        />

        {/* ✨ Pre-processing message */}
        {!loading && processed.length === 0 && (
          <section className="bg-white rounded-2xl shadow p-6 text-center text-gray-600">
            No generated captions yet — select photos above and click{" "}
            <b>Generate</b>.
          </section>
        )}

        {/* Loading shimmer */}
        {loading && (
          <div className="text-center text-gray-600 text-sm animate-pulse">
            ✨ Generating captions...
          </div>
        )}

        {/* SECTION 2 — Processed Results */}
        {!loading && processed.length > 0 && (
          <ProcessedImageSection processed={processed} />
        )}
      </main>
    </div>
  );
}
