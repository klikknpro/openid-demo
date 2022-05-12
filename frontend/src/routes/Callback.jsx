import { React, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import http from "axios";
import UpdateProfile from "../components/UpdateProfile";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loggedIn, setLoggedIn] = useState(false);

  const sendAuthCode = async (code) => {
    try {
      const response = await http.post("http://localhost:4000/api/login", {
        code,
      });
      sessionStorage.setItem("googleToken", response.data);
      setLoggedIn(true);
      // setTimeout(() => {
      //   navigate("/");
      // }, 2500);
    } catch (err) {
      if (!err.response) return alert("network error");
      return alert("something went wrong");
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");
    sendAuthCode(code);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="callback">
      {!loggedIn ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex-container">
          <h1>You are logged in. Welcome!</h1>
          <UpdateProfile />
        </div>
      )}
    </div>
  );
};

export default Callback;
