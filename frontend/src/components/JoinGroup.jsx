import { useState } from "react";

export default function JoinGroup({ onGroupJoined }) {
  const [code, setCode] = useState("");
  const [id , setid] = useState("")

  const handleJoin = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/join/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (res.ok) {
        console.log(res)
        setid(data.code)
    } else {
      alert("Invalid group code");
    }
    onGroupJoined(id)
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Join Group</h2>
      <input
        type="text"
        placeholder="Enter group code"
        className="w-full border px-3 py-2 rounded-md mb-4"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleJoin}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
      >
        Join
      </button>
    </div>
  );
}
