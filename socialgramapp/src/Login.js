import { useState } from "react";
import axios from "axios";
import Form from "./Form";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Here");
    // console.log(e.target);
    axios
      .post("http://127.0.0.1:8000/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setAccessToken(res.data.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    axios
      .get("http://127.0.0.1:8000/protected", config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Form
        username={username}
        password={password}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setpassword(e.target.value)}
        onFormSubmit={(e) => handleFormSubmit(e)}
      />
      {signupStatus}
    </div>
  );
}
