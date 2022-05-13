import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "axios";
import getUserEmail from "../utils/getUserEmail";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const [showPublic, setShowPublic] = useState("");
  const [showPrivate, setShowPrivate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [privateAccess, setPrivateAccess] = useState(false);

  const getPublic = async () => {
    try {
      const response = await http.get("http://localhost:4000/api/public");
      return setShowPublic(response.data);
    } catch (err) {
      if (!err.response) return alert("network error");
      if (err.response.status === 404) return alert("requested resource not found");
      return alert("something went wrong");
    }
  };

  const getPrivate = async () => {
    try {
      const response = await http.get("http://localhost:4000/api/private", {
        headers: {
          authorization: sessionStorage.getItem("googleToken"),
        },
      });
      return setShowPrivate(response.data);
    } catch (err) {
      if (!err.response) return alert("network error");
      if (err.response.status === 401) return alert("Unauthorized");
      return alert("something went wrong");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("googleToken");
    window.location.reload();
  };

  // google login
  const authenticationRequest = () => {
    window.open(
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com&redirect_uri=http://localhost:3000/callback&scope=openid%20email&prompt=select_account"
    );
  };

  useEffect(() => {
    if (sessionStorage.getItem("googleToken")) {
      setPrivateAccess(true);
      getUserEmail().then((data) => setUserEmail(data));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex-container">
      <div className="navbar">
        {privateAccess && (
          <>
            <Button onClick={() => navigate("/profile")} variant="contained" color="secondary" size="small">
              Edit my profile
            </Button>
            <p>{userEmail}</p>
          </>
        )}
      </div>
      <h1>Hello Oauth - Openid</h1>
      <Button onClick={() => getPublic()} variant="outlined" color="secondary" size="medium">
        Public request
      </Button>
      <p>{showPublic}</p>
      {privateAccess && (
        <Button onClick={() => getPrivate()} variant="outlined" color="secondary" size="medium">
          Private request
        </Button>
      )}
      <p>{showPrivate}</p>
      {sessionStorage.getItem("googleToken") ? (
        <Button onClick={logout} variant="contained" color="warning" size="medium">
          Logout
        </Button>
      ) : (
        <Button onClick={authenticationRequest} variant="contained" size="medium">
          Login with Google
        </Button>
      )}
    </div>
  );
};

export default Home;
