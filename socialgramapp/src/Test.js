import { Navigate, Outlet } from "react-router-dom";


export default function Test() {

  function handleClick() {
    <Navigate to="/" />;
    console.log("Hi there");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}