import { useEffect, useState, useRef } from "react";

export default function GroupRoom({ groupId }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const bottomRef = useRef(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/post-data/${groupId}/`);
      const data = await res.json();
      console.log("Fetched posts:", data);
      setPosts(data.reverse());
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handlePost = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/create-tweet/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          group: groupId,
          title: title,
          content: content,
        }),
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        fetchPosts();
      } else {
        const errorData = await res.text();
        console.error("Failed to post:", errorData);
      }
    } catch (err) {
      console.error("Error posting tweet:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [groupId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  return (
    <div className="flex flex-col h-screen bg-[#2b2d31] text-white">
      {/* Header */}
      <div className="bg-[#1e1f22] p-4 text-xl font-semibold text-center border-b border-gray-700 shadow">
        Group Chat Room
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {post.title?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="bg-[#404249] p-3 rounded-lg max-w-xl w-fit">
                <h4 className="text-sm font-semibold text-blue-400">
                  {post.title || "User"}
                </h4>
                <p className="text-sm mt-1">{post.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#1e1f22] p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name (optional)"
            className="w-1/4 px-3 py-2 rounded-md bg-[#383a40] border border-gray-600 placeholder-gray-400 text-white"
          />
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-md bg-[#383a40] border border-gray-600 placeholder-gray-400 text-white"
          />
          <button
            onClick={handlePost}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
