import { useState } from "react";
import axios from "axios";
import Form from "./Form";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  function handleFormSubmit(e) {
    e.preventDefault();
    // console.log(e.target);
    axios
      .post("http://127.0.0.1:8000/adduser", {
        username: username,
        password: password,
      })
      .then(() => {
        setSignupStatus("User Added Successfully!");
        setUserLoggedIn(true);
      })
      .catch((err) => {
        console.log("Error STATUTS ", err.response.status);
        if (err.response.status == 404) {
          setSignupStatus("Server is currently down. Try again later.");
        } else if (err.response.status == 409) {
          setSignupStatus("Username already exist!");
        } else {
          setSignupStatus("Error Occured !");
        }
      });
  }
  return (
    <div>
          <h1>SIGNUP</h1>
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
