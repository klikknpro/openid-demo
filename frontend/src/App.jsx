import { React, useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Callback from "./routes/Callback";
import Profile from "./routes/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

/*

*/
