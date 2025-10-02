import React, { useState, useEffect, useRef } from "react";

const pets = [
  {
    title: "Golden retriever on fetch duty.",
    caption: "Golden retriever an fe8",
    labels: ["dog", "frisbee", "park"],
    moods: ["playful", "energetic", "outdoorsy"],
    img: "/images/dog-frisbee.jpg"
  },
  {
    title: "Sunbeam supervisor on break.",
    caption: "cat, window, cushion",
    labels: ["cat", "window", "cushion"],
    moods: ["relaxed", "cozy", "sleepy"],
    img: "/images/cat-sunbeam.jpg"
  },
  {
    title: "Garden explorer on the prowl.",
    caption: "rabbit, grass, ears",
    labels: ["rabbit", "grass", "ears"],
    moods: ["alert", "curious", "gentle"],
    img: "/images/rabbit-garden.jpg"
  },
  {
    title: "Tongue out, no doubt.",
    caption: "dog, puppy, log",
    labels: ["dog", "puppy", "log"],
    moods: ["goofy", "excited", "friendly"],
    img: "/images/puppy-tongue.jpg"
  },
  {
    title: "Who, me? Up to something?",
    caption: "cat, table, whiskers",
    labels: ["cat", "table", "whiskers"],
    moods: ["curious", "sneaky", "focused"],
    img: "/images/cat-sneaky.jpg"
  },
  {
    title: "Feathered friend in full color.",
    caption: "parrot, beak, feathers",
    labels: ["parrot", "beak", "feathers"],
    moods: ["colorful", "vibrant", "calm"],
    img: "/images/parrot.jpg"
  }
];

function Dashboard() {
  const [filter, setFilter] = useState("All");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef(null);

  // close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  // collect all labels & moods
  const allLabels = [...new Set(pets.flatMap((p) => p.labels))];
  const allMoods = [...new Set(pets.flatMap((p) => p.moods))];

  // filter logic
  const filteredPets = pets.filter((pet) => {
    if (filter !== "All") {
      if (filter === "Cats" && !pet.labels.includes("cat")) return false;
      if (
        filter === "Dogs" &&
        !(pet.labels.includes("dog") || pet.labels.includes("puppy"))
      )
        return false;
      if (
        filter === "Other" &&
        (pet.labels.includes("cat") || pet.labels.includes("dog"))
      )
        return false;
    }

    if (selectedLabel && !pet.labels.includes(selectedLabel)) return false;
    if (selectedMood && !pet.moods.includes(selectedMood)) return false;

    return true;
  });

  const clearFilters = () => {
    setSelectedLabel("");
    setSelectedMood("");
    setFilter("All");
  };

  // export csv
  const exportCSV = () => {
    const rows = pets.map(
      (pet) =>
        `"${pet.title}","${pet.caption}","${pet.labels.join(", ")}","${pet.moods.join(", ")}"`
    );
    const header = "Title,Caption,Labels,Moods\n";
    const csvContent = header + rows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pets.csv";
    link.click();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/images/paw-logo.png" alt="logo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold">Paws & Pixels</h1>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 text-lg font-medium">
            {["All", "Cats", "Dogs", "Other"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={
                  filter === tab
                    ? "text-blue-600 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Export + Profile */}
        <div className="flex items-center gap-4 relative" ref={profileRef}>
          <button
            onClick={exportCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-base font-semibold"
          >
            Export CSV
          </button>

          {/* Profile Avatar - default gray person */}
          <div className="relative">
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
            >
              {/* SVG person icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 24 24"
                stroke="gray"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zM4.8 21.6c0-3.2 2.6-5.8 7.2-5.8s7.2 2.6 7.2 5.8v.6H4.8v-.6z"
                />
              </svg>
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setFilter("All");
                    setSelectedLabel("");
                    setSelectedMood("");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  My Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Settings
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* Labels dropdown */}
        <div>
          <label className="mr-2 font-medium">Filter by Label:</label>
          <select
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Labels</option>
            {allLabels.map((label, idx) => (
              <option key={idx} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Moods dropdown */}
        <div>
          <label className="mr-2 font-medium">Filter by Mood:</label>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Moods</option>
            {allMoods.map((mood, idx) => (
              <option key={idx} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="bg-gray-300 px-4 py-2 rounded-md"
        >
          Clear Filters
        </button>
      </div>

      {/* Grid */}
      <div className="w-full px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-white overflow-hidden shadow flex flex-col"
            >
              <img
                src={pet.img}
                alt={pet.title}
                className="w-full h-64 object-contain bg-gray-100 rounded-t-lg"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="font-semibold text-base mb-2">{pet.title}</h2>

                {/* Labels */}
                <p className="text-gray-700 text-sm mb-2 flex flex-wrap gap-2">
                  Labels:
                  {pet.labels.map((label, i) => (
                    <span
                      key={i}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      {label}
                      {i < pet.labels.length - 1 ? "," : ""}
                    </span>
                  ))}
                </p>

                {/* Moods */}
                <p className="text-gray-700 text-sm flex flex-wrap gap-2">
                  Moods:
                  {pet.moods.map((mood, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium"
                    >
                      {mood}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
