import { useState } from "react";
import axios from "axios";
import Form from "./Form";
import Signup from "./Signup";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const [accessToken, setAccessToken] = useState("");
  function handleFormSubmit(e) {
    e.preventDefault();
    // console.log(e.target);
    axios
      .post("http://127.0.0.1:8000/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        // setAccessToken(res.data.access_token);
        localStorage.setItem("token", res.data.access_token);
        //.log("onlogn value", onLogin);
        onLogin(res.data.access_token);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(true);
      });
  }
  return (
    <div>
      <h1>Hello</h1>
      <Form
        username={username}
        password={password}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setpassword(e.target.value)}
        onFormSubmit={(e) => handleFormSubmit(e)}
      />
      {loggedIn === true ? <h2>Sign In Failed!</h2> : ""}
      {loggedIn === false ? (
        <>
          <h3>If you are a New User, Signup Below:</h3>
          <Signup />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
