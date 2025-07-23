
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { datacontext } from "../Context/IdContext";
import { useContext } from "react";

export default function CreatePost() {
  const [groupId, setGroupId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pass , set] = useState("");
  const [isSecure, setSecure] = useState(false);
  const [hide , setHide] = useState(false);
  const navigate = useNavigate();

  const handlePost = async () => {
  if (!content.trim()) return;

  const localdata = localStorage.getItem("user");
  if (!localdata) {
    alert("Session expired. Please log in again.");
    navigate("/");
    return;
  }

  const user = JSON.parse(localdata);
  const id = user.id;

  try {
    const res = await fetch("http://127.0.0.1:8000/api/create-tweet/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        group: id,
        title,
        content,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      if (isSecure) {
        await fetch("http://127.0.0.1:8000/api/create-secure-tweet/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tweet_id: data.id,
            is_secure: isSecure,
            secret_code: pass,
          }),
        });
      }

      setTitle("");
      setContent("");
      navigate(`/group-room/${id}`);
    } else {
      console.error("Post failed:", data);
    }
  } catch (err) {
    console.error("Error posting:", err);
  }
};

  return (
    <div className="min-h-screen bg-[#2b2d31] text-white p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create New Post</h2>

      <div className="max-w-2xl mx-auto space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full px-4 py-2 rounded bg-[#383a40] border border-gray-600 text-white"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your code or message here..."
          rows={10}
          className="w-full px-4 py-2 rounded bg-[#383a40] border border-gray-600 text-white resize-y"
        />
        <div className="flex items-center space-x-3">
        <input
        type="checkbox"
    id="securePost"
    checked={isSecure}
    onChange={() => setSecure(!isSecure)}
    className="w-5 h-5 text-indigo-600 bg-[#383a40] border-gray-600 rounded focus:ring-indigo-500"
  />
  <label htmlFor="securePost" className="text-gray-200 text-base">
    Set password for this post?
  </label>
</div>

{isSecure && (
  <div className="flex flex-col space-y-1">
    <label htmlFor="password" className="text-gray-300">
      Enter Password:
    </label>

    <input
      type={hide ? "text" : "password"}
      id="password"
      value={pass}
      onChange={(e) => set(e.target.value)}
      placeholder="Enter password"
      className="w-full px-4 py-2 rounded bg-[#383a40] border border-gray-600 text-white"
    />
    
    <div className="flex items-center space-x-3 ">
        <input
          type="checkbox"
          id="passhide"
          checked={hide}
          onChange={() => setHide(!hide)}
          className="w-5 h-5 text-indigo-600 bg-[#383a40] border-gray-600 rounded focus:ring-indigo-500"
        />
        <label htmlFor="securePost" className="text-gray-200 text-base">
            Show Password
        </label>
    </div>

  </div>
    )}
      
        <button
          onClick={handlePost}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
        >
          Post
        </button>
      </div>
    </div>
  );
}
