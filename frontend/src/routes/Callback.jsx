import { React, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import http from "axios";
import getUserEmail from "../utils/getUserEmail";
import UpdateProfile from "../components/UpdateProfile";
import { Button } from "@mui/material";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userEmail, setUserEmail] = useState("");
  const [newUser, setNewUser] = useState(false);

  const sendAuthCode = async (code) => {
    try {
      const response = await http.post("http://localhost:4000/api/login", {
        code,
      });
      sessionStorage.setItem("googleToken", response.data);
      getUserEmail().then((data) => setUserEmail(data));
      if (response.status === 201) return setNewUser(true);
      setTimeout(() => {
        navigate("/");
      }, 2500);
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
    <div className="flex-container">
      <h2>{userEmail}</h2>
      <h2>Welcome to Plather! You are logged in.</h2>
      {newUser && (
        <>
          <p>
            You can now finish creating your profile and hit "SAVE", or return to Home. (Don't worry, you can still
            update your profile later.)
          </p>

          <UpdateProfile />
          <Button onClick={() => navigate("/")} variant="contained" size="medium">
            Back to HOME
          </Button>
        </>
      )}
    </div>
  );
};

export default Callback;

/*
// setTimeout(() => {
      //   navigate("/");
      // }, 2500);
*/
