import IdContextProvider from "./Context/IdContext"; // default import
import {PostProvider} from "./Context/Postid";
import EditPost from "./components/EditPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupRoom from "./components/GroupRoom";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";

function App() {
  return (
    <PostProvider>
    <IdContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route  path="/create-post/:groupId" element={<CreatePost />} />
          <Route path="/group-room/:groupId" element={< GroupRoom/>} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="*" />
        </Routes>
      </Router>
    </IdContextProvider>
    </PostProvider>
  );
}

export default App;
