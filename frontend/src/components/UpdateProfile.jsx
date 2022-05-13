import { React, useState, useEffect } from "react";
import http from "axios";
import { Button, TextField } from "@mui/material";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [nickname, setNickname] = useState("");

  /*
{
    first_name: req.body.firstName,
    surname: req.body.surname,
    age: req.body.age,
    nickname: req.body.nickname,
  }
*/

  const save = async () => {
    const first_name = firstName.length === 0 ? undefined : "first_name";
    const surName = surname.length === 0 ? undefined : "surname";
    const aGe = age.length === 0 ? undefined : "age";
    const nickName = nickname.length === 0 ? undefined : "nickname";
    try {
      const response = await http.post(
        "http://localhost:4000/api/private/update-profile",
        {
          [first_name]: firstName,
          [surName]: surname,
          [aGe]: age,
          [nickName]: nickname,
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
