import { useState } from "react";

export default function CreateGroup({ onGroupCreated }) {
  const [title, setTitle] = useState("");
  const [code,setcode] = useState("");
  const handleCreate = async () => {
  let data;
  try {
    const res = await fetch("http://127.0.0.1:8000/api/create-group/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: title,
        code: code,
      }),
    });

    try {
      data = await res.json();
    } catch (jsonErr) {
      const raw = await res.text();
      console.error("Invalid JSON response:", raw);
      return;
    }

    console.log(data);
    onGroupCreated(data.id);
    console.log(data.id)
  } catch (err) {
    console.error("Network or server error:", err);
  }
};

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Group</h2>
      <input
        type="text"
        placeholder="Enter group title"
        className="w-full border px-3 py-2 rounded-md mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter group code"
        className="w-full border px-3 py-2 rounded-md mb-4"
        onChange={(e) => setcode(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
      >
        Create
      </button>
    </div>
  );
}
