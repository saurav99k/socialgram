import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (username, password) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/login", {
        username: username,
        password: password,
      });
      setToken(res.data.access_token);
      sessionStorage.setItem("jwt-token", res.data.access_token);
      navigate("/dashboard");
      //console.log(response.data.access_token);
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
