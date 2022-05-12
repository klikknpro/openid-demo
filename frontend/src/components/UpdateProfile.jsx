import { React, useState, useEffect } from "react";
import http from "axios";
import { Button, TextField } from "@mui/material";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [nickname, setNickname] = useState("");

  const save = async () => {
    try {
      const response = await http.post(
        "http://localhost:4000/api/private/update-profile",
        {
          firstName,
          surname,
          age,
          nickname,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("googleToken"),
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      if (!err.response) return alert("network error");
      return alert("something went wrong");
    }
  };

  return (
    <div className="flex-container">
      <TextField
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        variant="filled"
        size="medium"
      />
      <TextField
        label="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        type="text"
        variant="filled"
        size="medium"
      />
      <TextField
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="number"
        variant="filled"
        size="medium"
      />
      <TextField
        label="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        type="text"
        variant="filled"
        size="medium"
      />
      <Button onClick={save} variant="contained" color="success" size="medium">
        Save
      </Button>
    </div>
  );
};

export default UpdateProfile;
