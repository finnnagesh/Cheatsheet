import { useState } from "react";
import CreateGroup from "./components/ CreateGroup.jsx";
import JoinGroup from "./components/JoinGroup.jsx";
import GroupRoom from "./components/GroupRoom.jsx";

export default function App() {
  const [groupId, setGroupId] = useState(null);
  const [groupCode, setGroupCode] = useState(null);

  if (groupId) {
    return <GroupRoom groupId={groupId} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Anonymous Group Poster</h1>
      <CreateGroup onGroupCreated={(id) => { setGroupId(id);  }} />
      <JoinGroup onGroupJoined={(id) => { setGroupId(id); }} />
    </div>
  );
}
