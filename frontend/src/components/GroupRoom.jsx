import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PostContext } from "../Context/Postid";
import { datacontext } from "../Context/IdContext";

export default function GroupRoom() {
  const { idg, setidg } = useContext(datacontext);
  const { postid, setPostId, edittitle, setEditTitle, editcontent, setEditContent } = useContext(PostContext);

  const [groupId, setgroupid] = useState(0);
  const [posts, setPosts] = useState([]);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Set groupId from localStorage
  useEffect(() => {
    const fetchGroupId = () => {
      const localdata = localStorage.getItem("user");
      if (localdata) {
        const user = JSON.parse(localdata);
        setidg(user.id);
        setgroupid(user.id); // ✅ Make sure groupId is updated
      } else {
        navigate("/");
      }
    };

    fetchGroupId();
  }, [navigate]);

  // ✅ Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/post-data/${groupId}/`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data.reverse());
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    if (groupId !== 0) {
      fetchPosts();
    }
  }, [groupId]);

  // ✅ Scroll to bottom on new posts
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  // ✅ Handle post edit
  const handleEdit = (post) => {
    setPostId(post.id);
    setEditTitle(post.title || '');
    setEditContent(post.content || '');
    navigate(`/edit-post/${post.id}`);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-[#2b2d31] text-white">
      {/* Header */}
      <div className="bg-[#1e1f22] p-4 text-xl font-semibold border-b border-gray-700 shadow flex justify-between items-center">
        <div>
          Group Chat Room (ID: {groupId})
          <Link
            to={`/create-post/${groupId}`}
            className="ml-4 text-sm text-indigo-400 hover:underline"
          >
            + New Post
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <div key={post.id || index} className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {post.title?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="bg-[#404249] p-3 rounded-lg max-w-xl w-fit group">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-blue-400 mr-3">
                    {post.title || "Untitled"}
                  </h4>
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-xs bg-[#383a40] hover:bg-[#4a4d55] text-gray-200 px-2 py-1 rounded-md border border-gray-600 transition"
                  >
                    Edit
                  </button>
                </div>

                <div className="text-sm mt-2">
                  <SyntaxHighlighter
                    language="javascript"
                    style={dracula}
                    showLineNumbers
                    wrapLongLines
                  >
                    {post.content}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
