import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import RawImageSection from "../components/RawImageSection";
import ProcessedImageSection from "../components/ProcessedImageSection";

// Helper: map by filename so each image gets the right caption/labels/moods
function analyzePhoto(p) {
  // get the file name (e.g., "puppy_smile.jpg")
  const base = String(p.url || "").split("/").pop().toLowerCase();

  switch (base) {
    case "golden_retriever.jpg":
      return {
        ...p,
        caption: "Golden retriever mid-play, frisbee and sunshine",
        labels: ["dog", "outdoor", "frisbee"],
        moods: ["joyful", "energetic"],
      };

    case "puppy_smile.jpg":
      return {
        ...p,
        caption: "Playful puppy popping over a fence",
        labels: ["puppy", "dog", "portrait"],
        moods: ["happy", "excited"],
      };

    case "cat_sleeping.jpg":
      return {
        ...p,
        caption: "Sleepy tabby soaking in warm window light",
        labels: ["cat", "window", "whiskers"],
        moods: ["calm", "cozy"],
      };

    case "rabbit_grass.jpg":
      return {
        ...p,
        caption: "Alert little rabbit nestled in fresh grass",
        labels: ["rabbit", "grass", "ears"],
        moods: ["curious", "gentle"],
      };

    case "parrot_blue.jpg":
      return {
        ...p,
        caption: "Vibrant macaw in crisp natural color",
        labels: ["parrot", "beak", "feathers"],
        moods: ["focused", "serene"],
      };

    default:
      // fallback for any other file names
      return {
        ...p,
        caption: "Natural light portrait with soft tones",
        labels: ["animal", "portrait"],
        moods: ["peaceful", "soft"],
      };
  }
}

export default function Dashboard() {
  const [raw] = useState([
    { id: "1", url: "/images/golden_retriever.jpg", name: "Golden Retriever" },
    { id: "2", url: "/images/cat_sleeping.jpg", name: "Cat Sleeping" },
    { id: "3", url: "/images/rabbit_grass.jpg", name: "Rabbit" },
    { id: "4", url: "/images/puppy_smile.jpg", name: "Puppy" },
    { id: "5", url: "/images/parrot_blue.jpg", name: "Parrot" },
  ]);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [processed, setProcessed] = useState([]);
  const [loading, setLoading] = useState(false);



  const toggleOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) =>
      prev.size === raw.length ? new Set() : new Set(raw.map((r) => r.id))
    );
  };

  const handleProcess = () => {
  setLoading(true); // show animation

  // simulate short delay to look like AI is thinking
  setTimeout(() => {
    const chosen = raw.filter((r) => selectedIds.has(r.id));
    const results = chosen.map(analyzePhoto);
    setProcessed(results);
    window.latestProcessed = results;
    setSelectedIds(new Set());
    setLoading(false); // hide animation
  }, 1200); // 1.2 seconds
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <HeaderBar />
      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        <RawImageSection
          photos={raw}
          selectedIds={selectedIds}
          onToggleOne={toggleOne}
          onToggleAll={toggleAll}
          onProcess={handleProcess}
        />
        {loading && (
  <div className="text-center text-gray-600 text-sm animate-pulse">
    ✨ Generating...
  </div>
)}

        <ProcessedImageSection processed={processed} />
      </main>
    </div>
  );
}
