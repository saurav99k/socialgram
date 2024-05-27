import { useState } from "react";
import axios from "axios";
export default function Login() {
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
          setSignupStatus("User Added Successfully!");
        }
      });
  }
  return (
    <div>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <label>Username</label>
        <input
          minLength={5}
          maxLength={10}
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Passowrd</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {signupStatus}
    </div>
  );
}
