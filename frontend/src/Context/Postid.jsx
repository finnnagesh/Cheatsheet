import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [postid, setPostId] = useState(null);
  const [edittitle, setEditTitle] = useState('');
  const [editcontent, setEditContent] = useState('');

  return (
    <PostContext.Provider value={{ postid, setPostId ,edittitle, setEditTitle, editcontent, setEditContent }}>
      {children}
    </PostContext.Provider>
  );
}
