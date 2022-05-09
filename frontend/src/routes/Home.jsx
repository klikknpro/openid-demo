import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <div className="flex-container">
      <h1>Hello Oauth - Openid</h1>
      <Button
        onClick={() => window.open("https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com&redirect_uri=http://localhost:3000/callback&scope=openid%20email&prompt=select_account")}
        variant="contained" size="small">
        Login with Google
      </Button>
    </div>
  )
}

export default Home
