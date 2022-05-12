import { React, useState, useEffect } from "react";
import http from "axios";
import { Button } from "@mui/material";

const Home = () => {
  const [showPublic, setShowPublic] = useState("");
  const [showPrivate, setShowPrivate] = useState("");
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

  // google login
  const authenticationRequest = () => {
    window.open(
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com&redirect_uri=http://localhost:3000/callback&scope=openid%20email&prompt=select_account"
    );
  };

  useEffect(() => {
    sessionStorage.getItem("googleToken") && setPrivateAccess(true);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex-container">
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
      <Button onClick={authenticationRequest} variant="contained" size="medium">
        Login with Google
      </Button>
    </div>
  );
};

export default Home;
