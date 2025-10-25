import HeaderBar from "../components/HeaderBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <HeaderBar />

      <main className="p-6 space-y-6">
        {/* Section 1: Raw Photos */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Section 1 — Raw Photos</h2>
          <p className="text-gray-500 text-sm">Your Google Photos will appear here.</p>
        </section>

        {/* Section 2: Processed Photos */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Section 2 — Processed Photos</h2>
          <p className="text-gray-500 text-sm">Processed images with captions, moods, and labels will appear here.</p>
        </section>
      </main>
    </div>
  );
}
