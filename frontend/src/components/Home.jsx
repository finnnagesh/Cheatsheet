import { useState } from "react";
import CreateGroup from "./ CreateGroup.jsx";
import JoinGroup from "./JoinGroup.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Anonymous Group Poster</h1>
      <CreateGroup />
      <JoinGroup/>
    </div>
  );
}