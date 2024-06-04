import axios from "axios";
import { useState } from "react";

export default function PostDisplay({ accessToken, userName }) {
  const [post, setPost] = useState([]);
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  function handleSubmit() {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    axios.get("http://127.0.0.1:8000/showpost", config).then((res) => {
      setPost(res.data.post);
      setClicked(true);
      console.log(post);
    });
  }

  function handleDivClick(obj) {
    const postid = obj.item.postid;
    console.log("clcikec");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    axios
      .delete(`http://127.0.0.1:8000/showpost?postid=${postid}`, config)
      .then((res) => {
        console.log(res);
        console.log("Here 2");
      })
      .then((res) =>
        axios.get("http://127.0.0.1:8000/showpost", config).then((res) => {
          console.log("After delete, ", res);
          setPost(res.data.post);
        })
      );
  }
  return (
    <>
      <button onClick={handleSubmit}>Show All Post</button>
      <button onClick={() => setClicked(false)}>Hide Post</button>

      {clicked == true
        ? post.map((item) => (
            <div onClick={() => handleDivClick({ item })} key={item.postid}>
              <h2>{item.title}111</h2>
              <i>{item.postid}</i>
              <hr />
              <h2></h2>
            </div>
          ))
        : ""}
    </>
  );
}
