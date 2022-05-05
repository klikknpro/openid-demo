import { React, useEffect, useState } from "react";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import http from "axios";

const Callback = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const exchangeToken = async(code) => {
    const response = await http.post("https://oauth2.googleapis.com/token", {
      code: code,
      client_id: "651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "http://localhost:3000/callback",
      grant_type: "authorization_code",
    });
    console.log(response.data);
  }

  useEffect(() => {
    const code = searchParams.get("code");
    exchangeToken(code);
    // eslint-disable-next-line
  }, [])


  return (
    <div className="flex-container">
      <h1>Callback</h1>
    </div>
  )
}

export default Callback
