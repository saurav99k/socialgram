import axios from "axios";
import { useState } from "react";

export default function PostDisplay({ accessToken }) {
  const [post, setPost] = useState([]);
  const [count, setCount] = useState(0);
  function handleSubmit() {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    axios.get("http://127.0.0.1:8000/showpost", config).then((res) => {
      setCount(res.data.count);
      setPost(res.data.post);
    });
  }
  return (
    <>
      <button onClick={handleSubmit}>Show my Post</button>
      <h3>
        You have {count} {count < 2 ? "post" : "posts"}{" "}
      </h3>
    </>
  );
}
