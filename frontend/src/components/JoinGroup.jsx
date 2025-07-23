import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { datacontext } from "../Context/IdContext";

export default function JoinGroup() {
  const [code, setCode] = useState("");
  const { idg, setidg} = useContext(datacontext);
  const navigate = useNavigate();
  const handleJoin = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/join/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (res.ok) {

        const newUser = {
          id: data.id,
          code: code,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        console.log(res)
        setidg(data.id)
        console.log(data.id)
        navigate(`/group-room/${data.id}`);
    } else {
      alert("Invalid group code");
    }
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
