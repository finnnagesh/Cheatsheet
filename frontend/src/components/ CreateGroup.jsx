import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { datacontext } from "../Context/IdContext";

export default function CreateGroup() {
  const { idg, setidg} = useContext(datacontext);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();



  const handleCreate = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/create-group/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: title, code }),
      });

      const data = await res.json();

      if (res.ok) {
        const newUser = {
          id: data.id,
          code: code,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        setidg(data.id);
        navigate(`/group-room/${data.id}`);
        console.log("Group created and stored:", newUser);
      } else {
        console.error("Server returned error:", data);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Create Group</h2>

      <input
        type="text"
        placeholder="Enter group title"
        className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter group code"
        className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={code}
        onChange={(e) => setCode(e.target.value)}
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
