import axios from "axios";
import { useState } from "react";

const { v4: uuidv4 } = require("uuid");

// console.log(uuidv4().slice(0, 8));

export default function PostForm({ accessToken, userName }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function handleSubmit() {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    axios
      .post(
        "http://127.0.0.1:8000/addpost",
        {
          postId: uuidv4().slice(0, 8),
          author: userName,
          title: title,
          description: desc,
          imgpath: "TBAL",
          postedAt: new Date().toLocaleString(),
        },
        config
      )
      .then((res) => console.log(res));
  }

  return (
    <div>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>description</label>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
