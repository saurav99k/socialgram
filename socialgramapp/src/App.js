import { useState } from "react";
import Login from "./Login";
import PostForm from "./PostForm";
import axios from "axios";
import PostDisplay from "./PostDisplay";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");
  const handleLogin = (token) => {
    setAccessToken(token);
    setLoggedIn(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("http://127.0.0.1:8000/protected", config)
      .then((res) => setUsername(res.data.logged_in_as));
  };
  const handleLogout = () => {
    setAccessToken("");
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Welcome {username}</h1>
          <PostForm accessToken={accessToken} userName={username} />
          <PostDisplay accessToken={accessToken} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
