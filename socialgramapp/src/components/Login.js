import { useState } from "react";
import axios from "axios";
import Form from "../Form";
import { useAuth } from "../hooks/AuthProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  // const [signupStatus, setSignupStatus] = useState("");
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("site") || ""
  );
  const auth = useAuth();
  function handleFormSubmit(e) {
    console.log(auth);
    e.preventDefault();
    auth.loginAction(username, password);
  }

  // function handleFormSubmit(e) {
  //   e.preventDefault();
  //   console.log("Here");
  //   axios
  //     .post("http://127.0.0.1:8000/login", {
  //       username: username,
  //       password: password,
  //     })
  //     .then((res) => {
  //       setAccessToken(res.data.access_token);

  //       sessionStorage.setItem("jwt-token", res.data.access_token);
  //       const config = {
  //         headers: { Authorization: `Bearer ${res.data.access_token}` },
  //       };
  //       axios
  //         .get("http://127.0.0.1:8000/protected", config)
  //         .then((res) => {
  //           console.log(res.data);
  //           setCurrentUser(res.data.logged_in_as);
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  return (
    <div>
      <h1>LOGIN</h1>
      <Form
        username={username}
        password={password}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setpassword(e.target.value)}
        onFormSubmit={(e) => handleFormSubmit(e)}
      />
      {/* {signupStatus} */}
      {currentUser == "" ? "" : `Welcome ${currentUser}`}
    </div>
  );
}
