import { React, useEffect, useState } from "react";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import http from "axios";

const Callback = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sendCode = async(code) => {
    const response = await http.post("http://localhost:4000/api/login", {
      code,
    });
    console.log("sajat token", response.data);
  };

  useEffect(() => {
    const code = searchParams.get("code");
    sendCode(code);
    // eslint-disable-next-line
  }, [])

  return (
    <div className="flex-container">
      <h1>Callback</h1>
    </div>
  )
}

export default Callback
