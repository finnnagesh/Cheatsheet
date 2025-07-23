import { useState, useEffect, useContext } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../Context/Postid';
import { datacontext } from '../Context/IdContext';

export default function EditPost() {
  const [locked, setLocked] = useState(true);
  const [key, setKey] = useState('');
  const [isSecure, setIsSecure] = useState(false);

  const { postid, edittitle, setPostId, setEditTitle, editcontent, setEditContent } = useContext(PostContext);
  const { idg } = useContext(datacontext);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchPost = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/post-auth/${postid}/`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setIsSecure(data.is_secure);
    } catch (err) {
      console.error("Failed to load post", err);
    }
  };

  if (postid) {
    fetchPost();
  }
}, [postid]);


  const handleUnlock = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/post-check/${postid}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: key }),
      });
      if (res.ok) {
        setIsSecure(false);
      } else {
        alert("Incorrect password");
      }
    } catch (err) {
      console.error("Error checking password", err);
    }
  };

  const handlePut = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/edit-post/${postid}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          group: idg,
          title: edittitle,
          content: editcontent,
        }),
      });
      if (res.ok) {
        alert("Post updated successfully");
        navigate(`/group-room/${idg}`);
      } else {
        alert("Failed to update post");
      }
    } catch (err) {
      console.error("Error updating post", err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/edit-post/${postid}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      if (res.ok) {
        alert("Post deleted successfully");
        navigate(`/group-room/${idg}`);
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#2b2d31] text-white p-6">
      <div className="max-w-2xl mx-auto bg-[#383a40] p-6 rounded-lg border border-gray-600 shadow space-y-6">
        {!isSecure ? (
          <>
            <div>
              <label className="block text-sm text-gray-200 mb-1">Edit Title</label>
              <input
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                value={edittitle}
                className="w-full px-4 py-2 rounded bg-[#2b2d31] border border-gray-600 text-white placeholder-gray-400"
                placeholder="Post Title"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-200 mb-1">Edit Content</label>
              <textarea
                rows="6"
                onChange={(e) => setEditContent(e.target.value)}
                value={editcontent}
                className="w-full px-4 py-2 rounded bg-[#2b2d31] border border-gray-600 text-white placeholder-gray-400 resize-y"
                placeholder="Post Content"
              ></textarea>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={handlePut}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-indigo-500">Post is Immutable</h2>
              <button
                onClick={handleUnlock}
                className="flex items-center gap-2 text-sm text-gray-300 border border-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-700 transition"
              >
                {isSecure ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {isSecure ? "Unlock Editing" : "Lock Editing"}
              </button>
            </div>

            {isSecure && (
              <div className="space-y-2">
                <label htmlFor="edit-password" className="text-sm text-gray-300">
                  Enter Password to Edit:
                </label>
                <input
                  id="edit-password"
                  type="password"
                  onChange={(e) => setKey(e.target.value)}
                  value={key}
                  className="w-full px-4 py-2 rounded-md bg-[#2b2d31] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter password"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
