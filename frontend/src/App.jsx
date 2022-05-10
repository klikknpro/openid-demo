import { React, useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Callback from "./routes/Callback";
import Home from "./routes/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </div>
  );
}

export default App;

/*
import logger from "./utils/logflare";
logger.info("logging to logflare");

Oauth client id
651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com

client secret
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
*/
